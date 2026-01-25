import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GymClass, Booking } from '../../models/class.model';
import * as ClassActions from './class.actions';

export interface ClassState extends EntityState<GymClass> {
    loading: boolean;
    error: any;
    totalClasses: number;
    memberBookings: Booking[];
    bookingsLoading: boolean;
}

export const adapter: EntityAdapter<GymClass> = createEntityAdapter<GymClass>({
    selectId: (c) => c._id || '',
    sortComparer: (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
});

export const initialState: ClassState = adapter.getInitialState({
    loading: false,
    error: null,
    totalClasses: 0,
    memberBookings: [],
    bookingsLoading: false
});

export const classReducer = createReducer(
    initialState,

    // Load Classes
    on(ClassActions.loadClasses, (state) => ({ ...state, loading: true, error: null })),
    on(ClassActions.loadClassesSuccess, (state, { response }) =>
        adapter.setAll(response.data, { ...state, loading: false, totalClasses: response.count || 0 })
    ),
    on(ClassActions.loadClassesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CRUD
    on(ClassActions.createClass,
        ClassActions.updateClass,
        ClassActions.deleteClass,
        (state) => ({ ...state, loading: true, error: null })),

    on(ClassActions.createClassSuccess, (state, { classData }) =>
        adapter.addOne(classData, { ...state, loading: false })
    ),
    on(ClassActions.updateClassSuccess, (state, { update }) =>
        adapter.updateOne(update, { ...state, loading: false })
    ),
    on(ClassActions.deleteClassSuccess, (state, { id }) =>
        adapter.removeOne(id, { ...state, loading: false })
    ),
    on(ClassActions.createClassFailure,
        ClassActions.updateClassFailure,
        ClassActions.deleteClassFailure,
        (state, { error }) => ({ ...state, loading: false, error })),

    // Booking
    on(ClassActions.bookClass, (state) => ({ ...state, bookingsLoading: true, error: null })),
    on(ClassActions.bookClassSuccess, (state, { booking }) => ({
        ...state,
        bookingsLoading: false,
        memberBookings: [booking, ...state.memberBookings] // Optimistic update for member view
    })),
    on(ClassActions.bookClassFailure, (state, { error }) => ({ ...state, bookingsLoading: false, error })),

    on(ClassActions.cancelBooking, (state) => ({ ...state, bookingsLoading: true, error: null })),
    on(ClassActions.cancelBookingSuccess, (state, { bookingId }) => ({
        ...state,
        bookingsLoading: false,
        memberBookings: state.memberBookings.filter(b => b._id !== bookingId)
    })),
    on(ClassActions.cancelBookingFailure, (state, { error }) => ({ ...state, bookingsLoading: false, error })),

    // Member Bookings
    on(ClassActions.loadMemberBookings, (state) => ({ ...state, bookingsLoading: true, error: null })),
    on(ClassActions.loadMemberBookingsSuccess, (state, { response }) => ({
        ...state,
        bookingsLoading: false,
        memberBookings: response.data
    })),
    on(ClassActions.loadMemberBookingsFailure, (state, { error }) => ({ ...state, bookingsLoading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

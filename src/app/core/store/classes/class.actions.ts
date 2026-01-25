import { createAction, props } from '@ngrx/store';
import { GymClass, ClassFilter, ClassResponse, Booking, BookingResponse } from '../../models/class.model';
import { Update } from '@ngrx/entity';

// Load Classes
export const loadClasses = createAction(
    '[Classes] Load Classes',
    props<{ filter?: ClassFilter }>()
);

export const loadClassesSuccess = createAction(
    '[Classes] Load Classes Success',
    props<{ response: ClassResponse }>()
);

export const loadClassesFailure = createAction(
    '[Classes] Load Classes Failure',
    props<{ error: any }>()
);

// CRUD
export const createClass = createAction(
    '[Classes] Create Class',
    props<{ classData: Partial<GymClass> }>()
);

export const createClassSuccess = createAction(
    '[Classes] Create Class Success',
    props<{ classData: GymClass }>()
);

export const createClassFailure = createAction(
    '[Classes] Create Class Failure',
    props<{ error: any }>()
);

export const updateClass = createAction(
    '[Classes] Update Class',
    props<{ id: string; changes: Partial<GymClass> }>()
);

export const updateClassSuccess = createAction(
    '[Classes] Update Class Success',
    props<{ update: Update<GymClass> }>()
);

export const updateClassFailure = createAction(
    '[Classes] Update Class Failure',
    props<{ error: any }>()
);

export const deleteClass = createAction(
    '[Classes] Delete Class',
    props<{ id: string }>()
);

export const deleteClassSuccess = createAction(
    '[Classes] Delete Class Success',
    props<{ id: string }>()
);

export const deleteClassFailure = createAction(
    '[Classes] Delete Class Failure',
    props<{ error: any }>()
);

// Booking
export const bookClass = createAction(
    '[Classes] Book Class',
    props<{ classId: string; memberId: string }>()
);

export const bookClassSuccess = createAction(
    '[Classes] Book Class Success',
    props<{ booking: Booking }>()
);

export const bookClassFailure = createAction(
    '[Classes] Book Class Failure',
    props<{ error: any }>()
);

export const cancelBooking = createAction(
    '[Classes] Cancel Booking',
    props<{ bookingId: string }>()
);

export const cancelBookingSuccess = createAction(
    '[Classes] Cancel Booking Success',
    props<{ bookingId: string }>()
);

export const cancelBookingFailure = createAction(
    '[Classes] Cancel Booking Failure',
    props<{ error: any }>()
);

// Member Bookings
export const loadMemberBookings = createAction(
    '[Classes] Load Member Bookings',
    props<{ memberId: string }>()
);

export const loadMemberBookingsSuccess = createAction(
    '[Classes] Load Member Bookings Success',
    props<{ response: BookingResponse }>()
);

export const loadMemberBookingsFailure = createAction(
    '[Classes] Load Member Bookings Failure',
    props<{ error: any }>()
);

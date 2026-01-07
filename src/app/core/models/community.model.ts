
export interface Post {
    _id?: string;
    authorId: string;
    content: string;
    gymId: string;
    createdAt?: string;
}

export interface PostLike {
    _id?: string;
    postId: string;
    userId: string;
    gymId: string;
}

export interface Comment {
    _id?: string;
    postId: string;
    authorId: string;
    content: string;
    gymId: string;
    createdAt?: string;
}

export interface Challenge {
    _id?: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    participants: string[]; // Ref Array: Member
    gymId: string;
}

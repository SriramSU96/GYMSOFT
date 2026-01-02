
export interface Post {
    id: string;
    authorId: string;
    title: string;
    content: string;
    likes: number;
    comments: number;
    gymId: string;
    createdAt: string;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    content: string;
    gymId: string;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: number;
    participants: number;
    gymId: string;
}

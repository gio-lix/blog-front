export interface UserProps {
    _id?: string
    avatarUrl: string
    fullName: string
}

export interface UserState {
    _id?: string
    email: string
    fullName: string
}

export interface CommentsState {
    _id: string
    text: string
    user: UserState
}

export interface DataState {
    _id: any,
    title: string,
    text: string,
    tags: string[],
    viewsCount: number,
    comments: string[]
    user: UserProps,
    imageUrl: string,
    createdAt: string,
    updatedAt: string
}
export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string
}

export interface PostWithCreatorDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string,
    creator_nickname: string
}


export interface PostModel{
    id:string,
    content:string,
    likes:number,
    dislikes:number,
    creator:{
        id:string,
        nickname:string,
    }
    comments:{
        count:number,
        comments: CommentModel[]
    }
    createdAt:string,
    updatedAt:string
}

export interface CommentDB {
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface CommentModel{
    id: string,
    postId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        nickname: string,
    }
}

export interface CommentWithCreatorDB {
    id:string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at:string,
    creator_nickname: string
}

export interface LikeDislikePostDB{
    post_id: string,
    user_id: string,
    like: number
}

export interface LikeDislikeCommentDB{
    user_id: string,
    comment_id: string,
    like: number
}

export enum POST_LIKE{
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export interface UserDB {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string,
    updated_at: string
}

export interface UserModel {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string,
    updatedAt: string
}

export interface TokenPayload {
    id: string,
    nickname: string,
    role: USER_ROLES
}
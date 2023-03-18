import { LikeDislikePostDB, PostDB, POST_LIKE, PostWithCreatorDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class PostsDatabaseMock extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_posts"

    public async getAllPosts() {
        return [
            {
                id: "id-mock",
                content: "Que dia mais lindo! Calor, sol e mar...",
                likes: 0,
                dislikes: 0,
                creator: {
                    id: "id-mock",
                    nickname: "Normal Mock",
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: "id-mock",
                content: "Feliz demais por essa semana! Muitas coisas por vir...",
                likes: 0,
                dislikes: 0,
                creator: {
                    id: "id-mock",
                    nickname: "Admin Mock",
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ]
    }


    public async getPostsByQuery(q: string | undefined) {

        if (q === "lindo") {
            return [
                {
                    id: "id-mock",
                    content: "Que dia mais lindo! Calor, sol e mar...",
                    likes: 0,
                    dislikes: 0,
                    creator: {
                        id: "id-mock",
                        nickname: "Normal Mock",
                    },
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ]
        }
        return []
    }

    public async getPostById(id: string | undefined): Promise<PostDB | undefined> {
        if (id === "id-mock") {
            return (
                {
                    id: "id-mock",
                    creator_id: "id-mock",
                    content: "Que dia mais lindo! Calor, sol e mar...",
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            )
        }

        return undefined
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        newPostDB = {
            id: "id-mock",
            creator_id: "id-mock",
            content: "Vamos pra praia?",
            likes: 0,
            dislikes: 0,
            comments: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
       
    return 

    }

    public async updatePostById(id: string, newPostDB: PostDB): Promise<void> {
        if(id === "id-mock"){
            newPostDB = {
                id: "id-mock",
                creator_id: "id-mock",
                content: "Vamos pra praia?",
                likes: 0,
                dislikes: 0,
                comments: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        }

        return
    }

    public async deletePostById(id: string): Promise<void> {
        if(id === "id-mock"){
            return
        }
    }

    public getPostWithCreatorById = async (id: string): Promise<PostWithCreatorDB[]> => {

        if (id === "id-mock") {
            return [
                {
                    id: "id-mock",
                    creator_id: "id-mock",
                    content: "Feliz demais por essa semana! Muitas coisas por vir...",
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_nickname: "Admin Mock"
                }
            ]
        }
        return []
    }

    public likeOrDislikePost = async (likeDislike: LikeDislikePostDB): Promise<void> => {
        likeDislike = {
            post_id: "p001",
            user_id: "id-mock",
            like: 1
        }

        return

    }

    public getLikeDislike = async (likeDislikeToFind: LikeDislikePostDB): Promise<POST_LIKE | null> => {
        likeDislikeToFind = {
            post_id: "p001",
            user_id: "id-mock",
            like: 0
        }
        
        return null

    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
        likeDislikeDB = {
            post_id: "p001",
            user_id: "id-mock",
            like: 0
        }
        
        return 
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
        likeDislikeDB = {
            post_id: "p001",
            user_id: "id-mock",
            like: 0
        }
        
        return 

    }

}
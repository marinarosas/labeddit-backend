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
                    creator_id: "id-mock2",
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
        //não precisa retornar nada porque é void

    }

    public async updatePostById(id: string, newPostDB: PostDB): Promise<void> {
        //não precisa retornar nada porque é void
    }

    public async deletePostById(id: string): Promise<void> {
        //não precisa retornar nada porque é void
    }

    public getPostWithCreatorById = async (id: string): Promise<PostWithCreatorDB[]> => {

        if(id === "id-mock"){
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
        //não precisa retornar nada porque é void

    }

    public getLikeDislike = async (likeDislikeToFind: LikeDislikePostDB): Promise<POST_LIKE | null> => {
       return POST_LIKE.ALREADY_LIKED
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
        //não precisa retornar nada porque é void

    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
        //não precisa retornar nada porque é void

    }

}
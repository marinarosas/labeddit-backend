import { LikeDislikePostDB, PostDB, POST_LIKE, PostWithCreatorDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class PostsDatabase extends BaseDatabase {

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
                    id: "id-mock1",
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
                    id: "id-mock1",
                    nickname: "Admin Mock",
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ]
    }


    public async getPostsByQuery(q: string | undefined) {
        return [
            {
                id: "id-mock",
                content: "Que dia mais lindo! Calor, sol e mar...",
                likes: 0,
                dislikes: 0,
                creator: {
                    id: "id-mock1",
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
                    id: "id-mock1",
                    nickname: "Admin Mock",
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ]
    }

    public async getPostById(id: string | undefined): Promise<PostDB | undefined> {
        const [postDBExist]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select()
            .where({ id: id })
        return postDBExist
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
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.comments",
                "posts.created_at",
                "posts.updated_at",
                "users.nickname"

            )
            .innerJoin("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", id)

        return result
    }

    public findPostWithCreatorById = async (postId: string): Promise<PostWithCreatorDB | undefined> => {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.nickname AS creator_nickname"

            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId)

        return result[0]
    }

    public likeOrDislikePost = async (likeDislike: LikeDislikePostDB): Promise<void> => {
                //não precisa retornar nada porque é void

    }

    public getLikeDislike = async (likeDislikeToFind: LikeDislikePostDB): Promise<POST_LIKE | null> => {
        const [likeDislikeDB]: LikeDislikePostDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeToFind.user_id,
                post_id: likeDislikeToFind.post_id
            })

        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        } else {
            return null
        }
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
                //não precisa retornar nada porque é void

    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise<void> => {
               //não precisa retornar nada porque é void

    }

}
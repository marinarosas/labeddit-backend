import { LikeDislikeCommentDB, CommentDB, CommentWithCreatorDB, POST_LIKE, CommentModel } from "../types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class CommentsDatabaseMock extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
    public static TABLE_POSTS_COMMENTS = "posts_comments"

    public async getAllComment() {
        return [
            {
                id: "id-mock",
                postId: "p001",
                content: "Que praia? To dentro!",
                likes: 0,
                dislikes: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                creator: {
                    id: "id-mock2",
                    nickname: "Normal Mock",
                }
            }
        ]
    }

    public async getCommentByQuery(q: string | undefined) {

        if (q === "dentro") {
            return [
                {
                    id: "id-mock",
                    postId: "p001",
                    content: "Que praia? To dentro!",
                    likes: 0,
                    dislikes: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    creator: {
                        id: "id-mock2",
                        nickname: "Normal Mock",
                    }
                }
            ]
        }
    }

    public async getCommentById(id: string | undefined): Promise<CommentDB | undefined> {
        if (id === "id=mock") {
            return [
                {
                    id: "id-mock",
                    postId: "p001",
                    content: "Que praia? To dentro!",
                    likes: 0,
                    dislikes: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    creator: {
                        id: "id-mock2",
                        nickname: "Normal Mock",
                    }
                }
            ]
        }
    }

    public async insertComment(newCommentDB: CommentDB): Promise<void> {
        //não precisa retornar nada porque é void
    }

    public async updateCommentById(id: string, newCommentDB: CommentDB): Promise<void> {
        //não precisa retornar nada porque é void
    }

    public async deleteCommentById(id: string): Promise<void> {
        //não precisa retornar nada porque é void
    }

    // public getCommentWithCreator = async (): Promise<CommentWithCreatorDB[]> => {
    //     const result: CommentWithCreatorDB[] = await BaseDatabase
    //         .connection(CommentsDatabase.TABLE_COMMENTS)
    //         .select(
    //             "comments.id",
    //             "comments.post_id",
    //             "comments.user_id",
    //             "comments.content",
    //             "comments.likes",
    //             "comments.dislikes",
    //             "comments.created_at",
    //             "comments.updated_at",
    //             "users.nickname AS creator_nickname"
    //         )
    //         .join("users", "comments.user_id", "=", "users.id")

    //     return result
    // }

    // public getCommentWithPostId = async (postId: string): Promise<CommentModel[]> => {
    //     const result: CommentModel[] = await BaseDatabase
    //         .connection(CommentsDatabase.TABLE_COMMENTS)
    //         .innerJoin("users", "comments.user_id", "=", "users.id")
    //         .select(
    //             // "comments.id",
    //             // "comments.post_id",
    //             // "comments.content",
    //             // "comments.likes",
    //             // "comments.dislikes",
    //             // "comments.created_at",
    //             // "comments.updated_at",
    //             // "comments.user_id",
    //             // "users.nickname"
    //             //"posts.id"
    //         )
    //         //.innerJoin("posts", "comments.post_id", "=", "posts.id")
    //         // .select(
    //         //     "posts.id"
    //         // )
    //         .where({post_id: postId})


    //     return result
    // }

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise<void> => {
        //não precisa retornar nada porque é void
    }

    //     public findLikeDislike = async (likeDislikeToFind: LikeDislikeCommentDB): Promise <POST_LIKE | null> =>{
    //         const [likeDislikeDB]: LikeDislikeCommentDB[] = await BaseDatabase
    //         .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
    //         .select()
    //         .where({
    //             user_id: likeDislikeToFind.user_id,
    //             comment_id: likeDislikeToFind.comment_id
    //         })

    //         if(likeDislikeDB){
    //             return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
    //         }else{
    //             return null
    //         }
    //     }    

    //     public removeLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise <void> =>{
    //         await BaseDatabase
    //         .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
    //         .delete()
    //         .where({
    //             user_id: likeDislikeDB.user_id,
    //             comment_id: likeDislikeDB.comment_id
    //         })
    //     }

    //     public updateLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise <void> =>{
    //         await BaseDatabase
    //         .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
    //         .update(likeDislikeDB)
    //         .where({
    //             user_id: likeDislikeDB.user_id,
    //             comment_id: likeDislikeDB.comment_id
    //         })
    //     }

}
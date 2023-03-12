import { LikeDislikeCommentDB, CommentDB, CommentWithCreatorDB, POST_LIKE, CommentModel } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {

    public static TABLE_COMMENTS = "comments"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
    public static TABLE_POSTS_COMMENTS = "posts_comments"

    public async getAllComment() {
        return await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
    }

    public async getCommentByQuery(q: string | undefined) {
        return await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).where("content", "LIKE", `%${q}%`)
    }

    public async getCommentById(id: string | undefined): Promise<CommentDB | undefined> {
        const [commentDBExist]: CommentDB[] | undefined[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select()
            .where({ id: id })
        return commentDBExist
    }

    public async insertComment(newCommentDB: CommentDB): Promise<void> {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).insert(newCommentDB)

    }

    public async updateCommentById(id: string, newCommentDB: CommentDB): Promise<void> {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .update(newCommentDB)
            .where({ id })
    }

    public async deleteCommentById(id: string): Promise<void> {

        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .del()
            .where({ id })
    }

    public getCommentWithCreator = async (): Promise<CommentWithCreatorDB[]> => {
        const result: CommentWithCreatorDB[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                "comments.id",
                "comments.post_id",
                "comments.user_id",
                "comments.content",
                "comments.likes",
                "comments.dislikes",
                "comments.created_at",
                "comments.updated_at",
                "users.nickname AS creator_nickname"
            )
            .join("users", "comments.user_id", "=", "users.id")

        return result
    }

    public getCommentWithPostId = async (postId: string): Promise<CommentModel[]> => {
        const result: CommentModel[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                "comments.id",
                "comments.post_id AS postId",
                "comments.content",
                "comments.likes",
                "comments.dislikes",
                "comments.created_at AS createdAt",
                "comments.updated_at AS updatedAt",
                "comments.user_id",
                "users.nickname AS creator_nickname"
            )
            .join("posts", "comments.post_id", "=", "posts.id")
            .join("users", "comments.user_id", "=", "user.id")
            .where("post_id", postId)

        return result
    }

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .insert(likeDislike)
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
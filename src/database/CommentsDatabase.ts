import { LikeDislikeCommentDB, CommentDB, CommentWithCreatorDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {

    public static TABLE_COMMENTS_POST = "comments_post"
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
    public static TABLE_POSTS_COMMENTS = "posts_comments"

    public async findComment(q: string | undefined) {

        let commentDB

        if (q) {
            const result = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS_POST).where("content", "LIKE", `%${q}%`)
            commentDB = result
        } else {
            const result = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS_POST)
            commentDB = result
        }

        return commentDB
    }

    public async findCommentById(id: string | undefined): Promise<CommentDB | undefined> {
        const [commentDBExist]: CommentDB[] | undefined[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS_POST)
            .select()
            .where({ id: id })
        return commentDBExist
    }

    public async insertComment(newCommentDB: CommentDB): Promise<void> {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS_POST).insert(newCommentDB)

    }

    public async updateCommentById(id: string, newCommentDB: CommentDB): Promise<void> {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS_POST)
            .update(newCommentDB)
            .where({id})
    }

    public async deleteCommentById(id: string): Promise <void> {

        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS_POST)
            .del()
            .where({ id })
    }

    public getCommentWithCreator = async (): Promise <CommentWithCreatorDB[]> => {
        const result: CommentWithCreatorDB[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS_POST)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")

        return result
    } //?????

    public findCommentWithCreatorById = async (commentId: string): Promise <CommentWithCreatorDB | undefined> => {
        const result: CommentWithCreatorDB[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS_POST)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", commentId)

        return result[0]
    } //?????

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise <void> =>{
        await BaseDatabase
        .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
        .insert(likeDislike)
    }

    public findLikeDislike = async (likeDislikeToFind: LikeDislikeCommentDB): Promise <POST_LIKE | null> =>{
        const [likeDislikeDB]: LikeDislikeCommentDB[] = await BaseDatabase
        .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
        .select()
        .where({
            user_id: likeDislikeToFind.user_id,
            comment_id: likeDislikeToFind.comment_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        }else{
            return null
        }
    }    

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise <void> =>{
        await BaseDatabase
        .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            comment_id: likeDislikeDB.comment_id
        })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise <void> =>{
        await BaseDatabase
        .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            comment_id: likeDislikeDB.comment_id
        })
    }
        
}
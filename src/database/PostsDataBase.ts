import { LikeDislikePostDB, PostDB, POST_LIKE, PostWithCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes_posts"

    public async getAllPosts(){
        return await BaseDatabase.connection(PostsDatabase.TABLE_POSTS)
    }

    
    public async getPostsByQuery(q: string | undefined) {
    return await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`)
    }

    public async getPostById(id: string | undefined): Promise<PostDB | undefined> {
        const [postDBExist]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select()
            .where({ id: id })
        return postDBExist
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(newPostDB)

    }

    public async updatePostById(id: string, newPostDB: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({id})
    }

    public async deletePostById(id: string): Promise <void> {

        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .del()
            .where({ id })
    }

    public getPostWithCreatorById = async (id: string): Promise <PostWithCreatorDB[]> => {
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

    public likeOrDislikePost = async (likeDislike: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
        .insert(likeDislike)
    }

    public getLikeDislike = async (likeDislikeToFind: LikeDislikePostDB): Promise <POST_LIKE | null> =>{
        const [likeDislikeDB]: LikeDislikePostDB[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
            user_id: likeDislikeToFind.user_id,
            post_id: likeDislikeToFind.post_id
        })

        if(likeDislikeDB){
            return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
        }else{
            return null
        }
    }    

    public removeLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise <void> =>{
        await BaseDatabase
        .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
            user_id: likeDislikeDB.user_id,
            post_id: likeDislikeDB.post_id
        })
    }
        
}
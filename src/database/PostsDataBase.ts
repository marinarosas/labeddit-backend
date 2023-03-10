// import { CreatePostOutputDTO } from "../dtos/PostDTO";
// import { LikeDislikePostDB, PostDB, PostWithCreatorDB, POST_LIKE } from "../types";
// import { BaseDatabase } from "./BaseDatabase";

// export class PostsDatabase extends BaseDatabase {

//     public static TABLE_POSTS = "posts"
//     public static TABLE_LIKES_DISLIKES = "likes_dislikes"

//     public async getAllPosts(){
//         const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS)
//             return result
//     }

    
//     public async getPosts(q: string | undefined) {

//         let postDB

//         if (q) {
//             const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`)
//             postDB = result
//         } else {
//             const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS)
//             postDB = result
//         }

//         return postDB
//     }

//     public async getPostById(id: string | undefined): Promise<PostDB | undefined> {
//         const [postDBExist]: PostDB[] | undefined[] = await BaseDatabase
//             .connection(PostsDatabase.TABLE_POSTS)
//             .select()
//             .where({ id: id })
//         return postDBExist
//     }

//     public async insertPost(newPostDB: PostDB): Promise<void> {
//         await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(newPostDB)

//     }

//     public async updatePostById(id: string, newPostDB: PostDB): Promise<void> {
//         await BaseDatabase
//             .connection(PostsDatabase.TABLE_POSTS)
//             .update(newPostDB)
//             .where({id})
//     }

//     public async deletePostById(id: string): Promise <void> {

//         await BaseDatabase
//             .connection(PostsDatabase.TABLE_POSTS)
//             .del()
//             .where({ id })
//     }

//     // public getPostWithCreator = async (): Promise <PostWithCreatorDB[]> => {
//     //     const result: PostWithCreatorDB[] = await BaseDatabase
//     //         .connection(PostsDatabase.TABLE_POSTS)
//     //         .select(
//     //             "posts.id",
//     //             "posts.creator_id",
//     //             "posts.content",
//     //             "posts.likes",
//     //             "posts.dislikes",
//     //             "posts.created_at",
//     //             "posts.updated_at",
//     //             "users.nickname AS creator_nickname"

//     //         )
//     //         .join("users", "posts.creator_id", "=", "users.id")

//     //     return result
//     // }

//     // public findPostWithCreatorById = async (postId: string): Promise <PostWithCreatorDB | undefined> => {
//     //     const result: PostWithCreatorDB[] = await BaseDatabase
//     //         .connection(PostsDatabase.TABLE_POSTS)
//     //         .select(
//     //             "posts.id",
//     //             "posts.creator_id",
//     //             "posts.content",
//     //             "posts.likes",
//     //             "posts.dislikes",
//     //             "posts.created_at",
//     //             "posts.updated_at",
//     //             "users.nickname AS creator_nickname"

//     //         )
//     //         .join("users", "posts.creator_id", "=", "users.id")
//     //         .where("posts.id", postId)

//     //     return result[0]
//     // }

//     public likeOrDislikePost = async (likeDislike: LikeDislikePostDB): Promise <void> =>{
//         await BaseDatabase
//         .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
//         .insert(likeDislike)
//     }

//     public getLikeDislike = async (likeDislikeToFind: LikeDislikePostDB): Promise <POST_LIKE | null> =>{
//         const [likeDislikeDB]: LikeDislikePostDB[] = await BaseDatabase
//         .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
//         .select()
//         .where({
//             user_id: likeDislikeToFind.user_id,
//             post_id: likeDislikeToFind.post_id
//         })

//         if(likeDislikeDB){
//             return likeDislikeDB.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DISLIKED
//         }else{
//             return null
//         }
//     }    

//     public removeLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise <void> =>{
//         await BaseDatabase
//         .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
//         .delete()
//         .where({
//             user_id: likeDislikeDB.user_id,
//             post_id: likeDislikeDB.post_id
//         })
//     }

//     public updateLikeDislike = async (likeDislikeDB: LikeDislikePostDB): Promise <void> =>{
//         await BaseDatabase
//         .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
//         .update(likeDislikeDB)
//         .where({
//             user_id: likeDislikeDB.user_id,
//             post_id: likeDislikeDB.post_id
//         })
//     }
        
// }
import { LikeDislikeCommentDB, CommentDB, CommentWithCreatorDB, POST_LIKE, CommentModel } from "../../src/types";
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
                    id: "id-mock",
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
                        id: "id-mock",
                        nickname: "Normal Mock",
                    }
                }
            ]
        }
    }

    public async getCommentById(id: string | undefined): Promise<CommentModel[] | undefined> {
        if (id === "id-mock") {
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
                        id: "id-mock",
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

    public getCommentWithCreatorById = async (id: string): Promise <CommentWithCreatorDB[] | undefined> => {

        if(id === "id-mock"){
            return [{
             id: "id-mock",
             post_id: "p001",
             user_id: "id-mock",
             content: "Que praia? To dentro!",
             likes: 0,
             dislikes: 0,
             created_at: expect.any(String),
             updated_at: expect.any(String),
             creator_nickname: "Normal Mock"
         }]
        }
    }

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise<void> => {
        //não precisa retornar nada porque é void
    }

    public getLikeDislike = async (likeDislikeToFind: LikeDislikeCommentDB): Promise<POST_LIKE | null> => {
        return null
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
        //não precisa retornar nada porque é void
    }

    public updateLikeDislike = async (likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
        //não precisa retornar nada porque é void
    }

}
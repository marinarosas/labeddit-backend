import { BadRequestError } from "../errors/BadRequestError"
import { CommentModel } from "../types"

export interface CreateCommentInputDTO {
    content: string,
    postId: string,
    token: string | undefined
}

export interface CreateCommentsOutputDTO {
    id: string,
    postId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        nickname: string
    }
}

export interface GetCommentInputDTO {
    postId: string,
    token: string | undefined
}

export type GetCommentOutputDTO = CommentModel[]

export interface EditCommentInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: string,
}

export interface EditCommentOutputDTO {
    message: string
}

export interface DeleteCommentInputDTO {
    idToDelete: string,
    token: string | undefined
}

export interface DeleteCommentOutputDTO{
    message: string
}

export class CommentDTO {

    public getCommentInput(
        postId:unknown,
        token: unknown
    ): GetCommentInputDTO {

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")

        if (typeof postId !== "string") throw new BadRequestError("'postId' deve ser uma string")

        const dto: GetCommentInputDTO = {
            postId,
            token
        }

        return dto
    }

    public createCommentInput(
        content: unknown,
        postId:unknown,
        token: unknown
    ): CreateCommentInputDTO {

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")

        if (typeof postId !== "string") throw new BadRequestError("'postId' deve ser uma string")

        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        const dto: CreateCommentInputDTO = {
            content,
            postId,
            token
        }

        return dto
    }

    public editCommentInput(
        idToEdit: unknown | undefined,
        token: string | undefined,
        content: unknown | undefined
    ): EditCommentInputDTO {

        if (typeof idToEdit !== "string") throw new BadRequestError("'id' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")

        const dto = {
            idToEdit,
            token,
            content
        }

        return dto

    }

    public deleteCommentInput(
        idToDelete: unknown,
        token: unknown
    ): DeleteCommentInputDTO {

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")


        if (typeof idToDelete !== "string") throw new BadRequestError("'id' deve ser string")

        const dto: DeleteCommentInputDTO = {
            idToDelete,
            token
        }

        return dto
    }
}
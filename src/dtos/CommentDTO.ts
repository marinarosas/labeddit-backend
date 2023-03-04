import { BadRequestError } from "../errors/BadRequestError"
import { CommentModel } from "../types"

export interface GetCommentInputDTO {
    token: string | undefined
}

export type GetCommentOutputDTO = CommentModel[]

export interface CreateCommentInputDTO {
    content: string,
    tokenUser: string | undefined
}

export interface CreateCommentOutputDTO {
    message: string,
    comment: {
        id: string,
        postId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string,
        creator: {
            userId: string,
            creatorName: string
        }
    }
}

export interface EditCommentInputDTO {
    idToEdit: string,
    content: string,
    token: string | undefined
}

export interface EditCommentOutputDTO {
    message: string,
    post: {
        idToEdit: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export interface DeleteCommentInputDTO {
    idToDelete: string,
    token: string | undefined
}

export class PostDTO {

    public createCommentInput(
        content: unknown,
        tokenUser: unknown
    ): CreateCommentInputDTO {

        if (typeof tokenUser !== "string") throw new BadRequestError("'token' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        const dto: CreateCommentInputDTO = {
            content,
            tokenUser
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
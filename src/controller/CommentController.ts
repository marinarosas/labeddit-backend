import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { LikesDislikesInputDTO } from "../dtos/LikesDislikesDTO"
import { DeleteCommentInputDTO, EditCommentInputDTO, GetCommentInputDTO } from "../dtos/CommentDTO"
import { BaseError } from "../errors/BaseError"

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) { }

    public getComments = async (req: Request, res: Response) => {
        try {

            const input: GetCommentInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.commentBusiness.getComments(input)

            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {

            const input = {
                content: req.body.content,
                tokenUser: req.headers.authorization
            }

            await this.commentBusiness.createComment(input)

            res.status(201).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editComment = async (req: Request, res: Response) => {
        try {

            const input: EditCommentInputDTO = {
                idToEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }

            await this.commentBusiness.editComment(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {
            const input: DeleteCommentInputDTO = {
                idToDelete: req.params.id,
                token: req.headers.authorization
            }

            await this.commentBusiness.deleteComment(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public likeOrDislikeComment = async (req: Request, res: Response) => {
        try {

            const input: LikesDislikesInputDTO = {
                idToLikeDislike: req.params.id,
                token: req.headers.authorization,
                like: req.body.like
            }

            await this.commentBusiness.likeOrDislikeComment(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}
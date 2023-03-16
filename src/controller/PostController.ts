import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { LikeDislikeDTO } from "../dtos/LikesDislikesDTO"
import {  PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
    constructor(
        private postDTO: PostDTO,
        private likeDislikeDTO: LikeDislikeDTO,
        private postBusiness: PostBusiness
        
    ) { }

    public getPosts = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.getPostInput(
                req.headers.authorization
            )

           const output = await this.postBusiness.getPosts(input)

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

    public createPost = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.createPostInput(
                req.body.content,
                req.headers.authorization
            )

            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.editPostInput(
                req.params.id,
                req.headers.authorization,
                req.body.content
            )

            const output = await this.postBusiness.editPost(input)

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

    public deletePost = async (req: Request, res: Response) => {
        try {

            const input = this.postDTO.deletePostInput(
                req.params.id,
                req.headers.authorization
            )
               
            const output = await this.postBusiness.deletePost(input)

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

    public likeOrDislikePost = async (req: Request, res: Response) => {
        try {

            const input = this.likeDislikeDTO.likesDislikesPostInput(
                req.params.id,
                req.headers.authorization,
                req.body.like
            )

            const output = await this.postBusiness.likeOrDislikePost(input)

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
}
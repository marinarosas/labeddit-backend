import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { CommentsDatabase } from '../database/CommentsDataBase'
import { UsersDatabase } from '../database/UsersDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postRouter = express.Router()

const postController = new CommentController(
    new CommentBusiness(
        new CommentsDatabase(),
        new IdGenerator(),
        new UsersDatabase(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getComments)
postRouter.post("/", postController.createComment)
postRouter.put("/:id", postController.editComment)
postRouter.delete("/:id", postController.deleteComment)
postRouter.put("/:id/like", postController.likeOrDislikeComment)

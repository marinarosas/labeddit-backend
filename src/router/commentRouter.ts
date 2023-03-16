import express from 'express'
import { CommentBusiness } from '../business/CommentBusiness'
import { CommentController } from '../controller/CommentController'
import { CommentsDatabase } from '../database/CommentsDataBase'
import { PostsDatabase } from '../database/PostsDataBase'
import { UsersDatabase } from '../database/UsersDatabase'
import { CommentDTO } from '../dtos/CommentDTO'
import { LikeDislikeDTO } from '../dtos/LikesDislikesDTO'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const commentRouter = express.Router()

const postController = new CommentController(
    new LikeDislikeDTO(),
    new CommentDTO(),
    new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabase(),
        new IdGenerator(),
        new UsersDatabase(),
        new TokenManager()
    )
)

commentRouter.get("/:id", postController.getComments)
commentRouter.post("/:id", postController.createComment)
commentRouter.put("/:id", postController.editComment)
commentRouter.delete("/:id", postController.deleteComment)
commentRouter.put("/:id/like", postController.likeOrDislikeComment)

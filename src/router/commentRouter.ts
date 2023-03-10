// import express from 'express'
// import { CommentBusiness } from '../business/CommentBusiness'
// import { CommentController } from '../controller/CommentController'
// import { CommentsDatabase } from '../database/CommentsDataBase'
// import { UsersDatabase } from '../database/UsersDatabase'
// import { IdGenerator } from '../services/IdGenerator'
// import { TokenManager } from '../services/TokenManager'

// export const commentRouter = express.Router()

// const postController = new CommentController(
//     new CommentBusiness(
//         new CommentsDatabase(),
//         new IdGenerator(),
//         new UsersDatabase(),
//         new TokenManager()
//     )
// )

// commentRouter.get("/", postController.getComments)
// commentRouter.post("/", postController.createComment)
// commentRouter.put("/:id", postController.editComment)
// commentRouter.delete("/:id", postController.deleteComment)
// commentRouter.put("/:id/like", postController.likeOrDislikeComment)

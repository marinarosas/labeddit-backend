// import { CommentsDatabase } from "../database/CommentsDataBase"
// import { UsersDatabase } from "../database/UsersDatabase"
// import { LikesDislikesInputDTO } from "../dtos/LikesDislikesDTO"
// import { CreateCommentInputDTO, DeleteCommentInputDTO, EditCommentInputDTO, GetCommentInputDTO, GetCommentOutputDTO } from "../dtos/CommentDTO"
// import { BadRequestError } from "../errors/BadRequestError"
// import { NotFoundError } from "../errors/NotFoundError"
// import { Comment } from "../models/Comment"
// import { IdGenerator } from "../services/IdGenerator"
// import { TokenManager } from "../services/TokenManager"
// import { LikeDislikeCommentDB, CommentWithCreatorDB, POST_LIKE, USER_ROLES } from "../types"

// export class CommentBusiness {
//     constructor(
//         private commentsDatabase: CommentsDatabase,
//         private idGenerator: IdGenerator,
//         private usersDatabase: UsersDatabase,
//         private tokenManager: TokenManager
//     ) { }

//     public getComments = async (input: GetCommentInputDTO): Promise<GetCommentOutputDTO> => {

//         const { token } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("'token'inválido")
//         }

//         const commentsWithCreatorDB: CommentWithCreatorDB[] = await this.commentsDatabase.getCommentWithCreator()


//         const comments = commentsWithCreatorDB.map((commentWithCreatorDB) => {
//             const comment = new Comment(
//                 commentWithCreatorDB.id,
//                 commentWithCreatorDB.post_id,
//                 commentWithCreatorDB.content,
//                 commentWithCreatorDB.likes,
//                 commentWithCreatorDB.dislikes,
//                 commentWithCreatorDB.created_at,
//                 commentWithCreatorDB.updated_at,
//                 commentWithCreatorDB.creator_id,
//                 commentWithCreatorDB.creator_nickname
//             )

//             private id: string,
//             private postId: string,
//             private content: string,
//             private likes: number,
//             private dislikes: number,
//             private createdAt: string,
//             private updatedAt: string,
//             private userId: string,
//             private creatorNickname: string


//             return comment.toBusinessModel()

//         }
//         )

//         const output: GetCommentOutputDTO = comments
//         return output
//     } //MUDAR PARA PEGAR ALL DE UM POST

//     public createComment = async (input: CreateCommentInputDTO): Promise<void> => {

//         const { content, token } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         if (typeof token !== "string") {
//             throw new BadRequestError("'token' deve ser uma string")
//         }

//         if (token === null) {
//             throw new BadRequestError("'token' deve ser informado")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         const id = this.idGenerator.generate()
//         const postId = payload.id // ISSO DAQUI TA ERRADO
//         const userId = payload.id
//         const creatorName = payload.nickname
//         let newLikes = 0
//         let newDislikes = 0

//         const newComment = new Comment(
//             id,
//             postId,
//             content,
//             newLikes,
//             newDislikes,
//             new Date().toISOString(),
//             new Date().toISOString(),
//             userId,
//             creatorName
//         )

//         const newCommentDB = newComment.toDBModel()

//         await this.commentsDatabase.insertComment(newCommentDB)
//     }

//     public editComment = async (input: EditCommentInputDTO): Promise<void> => {

//         const { idToEdit, content, token } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         if (typeof token !== "string") {
//             throw new BadRequestError("'token' deve ser uma string")
//         }

//         if (token === null) {
//             throw new BadRequestError("'token' deve ser informado")
//         }

//         const commentDB = await this.commentsDatabase.getCommentById(idToEdit)

//         if (!commentDB) {
//             throw new NotFoundError("'id' não encontrado")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         const userId = payload.id

//         if (commentDB.user_id !== userId) {
//             throw new BadRequestError("somente quem criou o post pode editá-la")
//         }

//         const creatorName = payload.nickname

//         const newPost = new Comment(
//             commentDB.id,
//             commentDB.post_id,
//             commentDB.content,
//             commentDB.likes,
//             commentDB.dislikes,
//             commentDB.created_at,
//             commentDB.updated_at,
//             userId,
//             creatorName
//         )

//         newPost.setContent(content)
//         newPost.setUpdatedAt(new Date().toISOString())

//         const newCommentDB = newPost.toDBModel()

//         await this.commentsDatabase.updateCommentById(idToEdit, newCommentDB)
//     }

//     public deleteComment = async (input: DeleteCommentInputDTO): Promise<void> => {

//         const { idToDelete, token } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         if (typeof token !== "string") {
//             throw new BadRequestError("'token' deve ser uma string")
//         }

//         if (token === null) {
//             throw new BadRequestError("'token' deve ser informado")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         const commentDB = await this.commentsDatabase.getCommentById(idToDelete)

//         if (!commentDB) {

//             throw new NotFoundError("Id não encontrado")
//         }

//         const userId = payload.id

//         if (
//             payload.role !== USER_ROLES.ADMIN &&
//             commentDB.user_id !== userId) {
//             throw new BadRequestError("somente quem criou o post pode deletá-la")
//         }

//         await this.commentsDatabase.deleteCommentById(idToDelete)

//     }

//     public likeOrDislikeComment = async (input: LikesDislikesInputDTO): Promise<void> => {

//         const { idToLikeDislike, token, like } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         if (typeof token !== "string") {
//             throw new BadRequestError("'token' deve ser uma string")
//         }

//         if (token === null) {
//             throw new BadRequestError("'token' deve ser informado")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         if (typeof like !== "boolean") {
//             throw new BadRequestError("'like' deve ser um booleano")
//         }

//         const commentWithCreatorDB = await this.commentsDatabase.getCommentWithCreatorById(idToLikeDislike)


//         if (!commentWithCreatorDB) {
//             throw new NotFoundError("Id não encontrado")
//         }

//         const userId = payload.id
//         const likeSQLite = like ? 1 : 0

//         const likeDislikeCommentDB: LikeDislikeCommentDB = {
//             user_id: userId,
//             comment_id: commentWithCreatorDB.id,
//             like: likeSQLite
//         }

//         const comment = new Comment(
//             commentWithCreatorDB.id,
//             commentWithCreatorDB.post_id,
//             commentWithCreatorDB.content,
//             commentWithCreatorDB.likes,
//             commentWithCreatorDB.dislikes,
//             commentWithCreatorDB.created_at,
//             commentWithCreatorDB.updated_at,
//             commentWithCreatorDB.user_id,
//             commentWithCreatorDB.creator_name
//         )

//         const likeDislikeExist = await this.commentsDatabase
//             .findLikeDislike(likeDislikeCommentDB)
        
//         if (likeDislikeExist === POST_LIKE.ALREADY_LIKED) {

//             if (like) {
//                 await this.commentsDatabase.removeLikeDislike(likeDislikeCommentDB)
//                 comment.removeLike()
//             } else {
//                 await this.commentsDatabase.updateLikeDislike(likeDislikeCommentDB)
//                 comment.removeLike()
//                 comment.addDislike()
//             }
//         } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
//             if (like) {
//                 await this.commentsDatabase.updateLikeDislike(likeDislikeCommentDB)
//                 comment.removeDislike()
//                 comment.addLike()
//             } else {
//                 await this.commentsDatabase.removeLikeDislike(likeDislikeCommentDB)
//                 comment.removeDislike()
//             }
//         } else {

//             await this.commentsDatabase.likeOrDislikeComment(likeDislikeCommentDB)

//             like ? comment.addLike() : comment.addDislike()

//         }

//         const updateCommentDB = comment.toDBModel()

//         await this.commentsDatabase.updateCommentById(idToLikeDislike, updateCommentDB)
//     }

// }
import { CommentsDatabase } from "../database/CommentsDataBase"
import { UsersDatabase } from "../database/UsersDatabase"
import { LikesDislikesInputDTO, LikesDislikesOutputDTO } from "../dtos/LikesDislikesDTO"
import { CreateCommentInputDTO, CreateCommentsOutputDTO, DeleteCommentInputDTO, DeleteCommentOutputDTO, EditCommentInputDTO, EditCommentOutputDTO, GetCommentInputDTO } from "../dtos/CommentDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Comment } from "../models/Comment"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { LikeDislikeCommentDB, POST_LIKE, USER_ROLES, CommentDB, TokenPayload } from "../types"
import { PostsDatabase } from "../database/PostsDataBase"

export class CommentBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private usersDatabase: UsersDatabase,
        private tokenManager: TokenManager
    ) { }

    public getComments = async (input: GetCommentInputDTO): Promise<CreateCommentsOutputDTO[]> => {

        const { postId, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if(postId === undefined){
            throw new BadRequestError("'postId' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const commentsDB: CommentDB[] = await this.commentsDatabase.getAllComment()

        //const posts: PostDB[] = await this.postsDatabase.getAllPosts()
        const users = await this.usersDatabase.getAllUsers()

        const comments = commentsDB.map((commentDB) => {
            const userFind = users.find((user)=>user.id === commentDB.user_id)
            //const postFind = posts.find((posts)=>posts.id === commentDB.post_id)
            // if(!postFind){
            //     throw new BadRequestError ("Post não encontrado")
            // }

            if(userFind === undefined){
                throw new BadRequestError("'userFind' não existe")
            }

            const user: TokenPayload = {
                id: userFind.id,
                nickname: userFind.nickname,
                role: userFind.role
            }

            const comment = new Comment(
                commentDB.id,
                postId,
                commentDB.content,
                commentDB.likes,
                commentDB.dislikes,
                commentDB.created_at,
                commentDB.updated_at,
                user.id,
                user.nickname
            )

            return comment.toBusinessModel()
        }
        )

        const output: CreateCommentsOutputDTO[] = comments
        return output        
    }

    public createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentsOutputDTO> => {

        const { content, postId, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (token === null) {
            throw new BadRequestError("'token' deve ser informado")
        }

        if(postId === null){
            throw new BadRequestError("'postId' deve ser informado")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }
        
        const id = this.idGenerator.generate()
        const userId = payload.id
        const creatorNickname = payload.nickname
        let newLikes = 0
        let newDislikes = 0
        let newComments = 0

        const newComment = new Comment(
            id,
            postId,
            content,
            newLikes,
            newDislikes,         
            new Date().toISOString(),
            new Date().toISOString(),
            userId,
            creatorNickname
        )
        
        const newCommentDB = newComment.toDBModel()

        await this.commentsDatabase.insertComment(newCommentDB)

        const output: CreateCommentsOutputDTO = newComment.toBusinessModel()

        return output
    }
    
    public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {

        const { idToEdit, token, content } = input
        console.log(token);
        
        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (token === null) {
            throw new BadRequestError("'token' deve ser informado")
        }

        const commentDB = await this.commentsDatabase.getCommentById(idToEdit)

        if (!commentDB) {
            throw new NotFoundError("'id' não encontrado")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        const userId = payload.id

        if (commentDB.user_id !== userId) {
            throw new BadRequestError("somente quem criou o comment pode editá-la")
        }

        const creatorNickname = payload.nickname

        const newComment = new Comment(
            commentDB.id,
            commentDB.post_id,
            commentDB.content,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at,
            commentDB.updated_at,    
            userId,
            creatorNickname,
        )

        newComment.setContent(content)
        newComment.setUpdatedAt(new Date().toISOString())

        const newCommentDB = newComment.toDBModel()

        await this.commentsDatabase.updateCommentById(idToEdit, newCommentDB)

        return ({
            message: "Comentário editado com sucesso"
        })
    }

    public deleteComment = async (input: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {

        const { idToDelete, token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (token === null) {
            throw new BadRequestError("'token' deve ser informado")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        const commentDB = await this.commentsDatabase.getCommentById(idToDelete)

        if (!commentDB) {

            throw new NotFoundError("Id não encontrado")
        }

        const userId = payload.id

        if (
            payload.role !== USER_ROLES.ADMIN &&
            commentDB.user_id !== userId) {
            throw new BadRequestError("somente quem criou o comment pode deletá-la")
        }

        await this.postsDatabase.deletePostById(idToDelete)

        return ({
            message: "Comment deletado com sucesso"
        })

    }

    public likeOrDislikeComment = async (input: LikesDislikesInputDTO): Promise<LikesDislikesOutputDTO> => {

        const { id, token, like } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if (token === null) {
            throw new BadRequestError("'token' deve ser informado")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        if (typeof like !== "boolean") {
            throw new BadRequestError("'like' deve ser um booleano")
        }

        const [commentWithCreatorDB] = await this.commentsDatabase.getCommentWithCreatorById(id)


        if (!commentWithCreatorDB) {
            throw new NotFoundError("Id não encontrado")
        }

        const userId = payload.id
        const likeSQLite = like ? 1 : 0

        const likeDislikeCommentDB: LikeDislikeCommentDB = {
            user_id: userId,
            comment_id: commentWithCreatorDB.id,
            like: likeSQLite
        }

        const post = new Comment(
            commentWithCreatorDB.id,
            commentWithCreatorDB.post_id,
            commentWithCreatorDB.content,
            commentWithCreatorDB.likes,
            commentWithCreatorDB.dislikes,
            commentWithCreatorDB.created_at,
            commentWithCreatorDB.updated_at,
            commentWithCreatorDB.user_id,
            commentWithCreatorDB.creator_nickname           
        )

        const likeDislikeExist = await this.commentsDatabase.getLikeDislike(likeDislikeCommentDB)
        
        if (likeDislikeExist === POST_LIKE.ALREADY_LIKED) {

            if (like) {
                await this.commentsDatabase.removeLikeDislike(likeDislikeCommentDB)
                post.removeLike()
            } else {
                await this.commentsDatabase.updateLikeDislike(likeDislikeCommentDB)
                post.removeLike()
                post.addDislike()
            }
        } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
            if (like) {
                await this.commentsDatabase.updateLikeDislike(likeDislikeCommentDB)
                post.removeDislike()
                post.addLike()
            } else {
                await this.commentsDatabase.removeLikeDislike(likeDislikeCommentDB)
                post.removeDislike()
            }
        } else {

            await this.commentsDatabase.likeOrDislikeComment(likeDislikeCommentDB)

            like ? post.addLike() : post.addDislike()

        }

        const updatePostDB = post.toDBModel()

        await this.commentsDatabase.updateCommentById(id, updatePostDB)

        return({
            message: "Like ou Dislike realizado com sucesso"
        }
        )
    }
}
// import { CommentsDatabase } from "../database/CommentsDataBase"
// import { PostsDatabase } from "../database/PostsDataBase"
// import { UsersDatabase } from "../database/UsersDatabase"
// import { LikesDislikesInputDTO } from "../dtos/LikesDislikesDTO"
// import { CreatePostInputDTO, CreatePostOutputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO } from "../dtos/PostDTO"
// import { BadRequestError } from "../errors/BadRequestError"
// import { NotFoundError } from "../errors/NotFoundError"
// import { Post } from "../models/Post"
// import { IdGenerator } from "../services/IdGenerator"
// import { TokenManager } from "../services/TokenManager"
// import { LikeDislikePostDB, PostDB, PostModel, POST_LIKE, TokenPayload, USER_ROLES } from "../types"


// export class PostBusiness {
//     constructor(
//         private postsDatabase: PostsDatabase,
//         private idGenerator: IdGenerator,
//         private commentsDatabase: CommentsDatabase,
//         private usersDatabase: UsersDatabase,
//         private tokenManager: TokenManager
//     ) { }

//     public getPosts = async (input: GetPostInputDTO): Promise<CreatePostOutputDTO[]> => {

//         const { token } = input

//         if (token === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("'token'inválido")
//         }

//         const postsDB: PostDB[] = await this.postsDatabase.getAllPosts()

//         const users = await this.usersDatabase.getAllUsers()

//         const posts = postsDB.map((postDB) => {
//             const userFind = users.find((user)=>user.id === postDB.creator_id)

//             if(!userFind){
//                 throw new BadRequestError ("Usuário não encontrado")
//             }

//             const user: TokenPayload = {
//                 id: userFind.id,
//                 nickname: userFind.nickname,
//                 role: userFind.role
//             }

//             const post = new Post(
//                 postDB.id,
//                 postDB.content,
//                 postDB.likes,
//                 postDB.dislikes,
//                 user.id,
//                 user.nickname,
//                 postDB.comments,
//                 postDB.created_at,
//                 postDB.updated_at,
//             )

//             return post
//         }
//         )

//         const output: CreatePostOutputDTO[] = []

//         for(let i of posts){
//             const comments = await this.commentsDatabase.getCommentWithCreatorById(i.getId())
//             if(!comments){
//                 throw new BadRequestError("Comentários não encontrados")
//             }
//             const result = i.toBusinessModel(comments)
//             output.push(result)
//         }
//         return output
//     }

//     public createPost = async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

//         const { content, tokenUser } = input

//         if (tokenUser === undefined) {
//             throw new BadRequestError("'token' ausente")
//         }

//         if (typeof tokenUser !== "string") {
//             throw new BadRequestError("'token' deve ser uma string")
//         }

//         if (tokenUser === null) {
//             throw new BadRequestError("'token' deve ser informado")
//         }

//         const payload = this.tokenManager.getPayload(tokenUser)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         const id = this.idGenerator.generate()

//         const creatorId = payload.id
//         const creatorNickname = payload.nickname
//         let newLikes = 0
//         let newDislikes = 0
//         let newComments = 0

//         const newPost = new Post(
//             id,
//             content,
//             newLikes,
//             newDislikes,
//             creatorId,
//             creatorNickname,
//             newComments,
//             new Date().toISOString(),
//             new Date().toISOString(),
//         )

//         const newPostDB = newPost.toDBModel()

//         await this.postsDatabase.insertPost(newPostDB)

//         const output: CreatePostOutputDTO = newPost.toBusinessModel([])
        

//         return output
//     }

//     public editPost = async (input: EditPostInputDTO): Promise<void> => {

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

//         const postDB = await this.postsDatabase.getPostById(idToEdit)

//         if (!postDB) {
//             throw new NotFoundError("'id' não encontrado")
//         }

//         const payload = this.tokenManager.getPayload(token)

//         if (payload === null) {
//             throw new BadRequestError("token não é valido")
//         }

//         const creatorId = payload.id

//         if (postDB.creator_id !== creatorId) {
//             throw new BadRequestError("somente quem criou o post pode editá-la")
//         }

//         const creatorNickname = payload.nickname

//         const newPost = new Post(
//             postDB.id,
//             postDB.content,
//             postDB.likes,
//             postDB.dislikes,
//             postDB.created_at,
//             postDB.updated_at,
//             postDB.comments,
//             creatorId,
//             creatorNickname
//         )

//         newPost.setContent(content)
//         newPost.setUpdatedAt(new Date().toISOString())

//         const newPostDB = newPost.toDBModel()

//         await this.postsDatabase.updatePostById(idToEdit, newPostDB)
//     }

//     public deletePost = async (input: DeletePostInputDTO): Promise<void> => {

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

//         const postDB = await this.postsDatabase.getPostById(idToDelete)

//         if (!postDB) {

//             throw new NotFoundError("Id não encontrado")
//         }

//         const creatorId = payload.id

//         if (
//             payload.role !== USER_ROLES.ADMIN &&
//             postDB.creator_id !== creatorId) {
//             throw new BadRequestError("somente quem criou o post pode deletá-la")
//         }

//         await this.postsDatabase.deletePostById(idToDelete)

//     }

//     // public likeOrDislikePost = async (input: LikesDislikesInputDTO): Promise<void> => {

//     //     const { idToLikeDislike, token, like } = input

//     //     if (token === undefined) {
//     //         throw new BadRequestError("'token' ausente")
//     //     }

//     //     if (typeof token !== "string") {
//     //         throw new BadRequestError("'token' deve ser uma string")
//     //     }

//     //     if (token === null) {
//     //         throw new BadRequestError("'token' deve ser informado")
//     //     }

//     //     const payload = this.tokenManager.getPayload(token)

//     //     if (payload === null) {
//     //         throw new BadRequestError("token não é valido")
//     //     }

//     //     if (typeof like !== "boolean") {
//     //         throw new BadRequestError("'like' deve ser um booleano")
//     //     }

//     //     //const postWithCreatorDB = await this.postsDatabase.getPostWithCreatorById(idToLikeDislike)


//     //     // if (!postWithCreatorDB) {
//     //     //     throw new NotFoundError("Id não encontrado")
//     //     // }

//     //     const userId = payload.id
//     //     const likeSQLite = like ? 1 : 0

//     //     // const likeDislikePostDB: LikeDislikePostDB = {
//     //     //     user_id: userId,
//     //     //    // post_id: postWithCreatorDB.id,
//     //     //     like: likeSQLite
//     //     // }

//     //     const post = new Post(
//     //         postWithCreatorDB.id,
//     //         postWithCreatorDB.content,
//     //         postWithCreatorDB.likes,
//     //         postWithCreatorDB.dislikes,
//     //         postWithCreatorDB.created_at,
//     //         postWithCreatorDB.updated_at,
//     //         postWithCreatorDB.creator_id,
//     //         postWithCreatorDB.creator_nickname
//     //     )

//     //     const likeDislikeExist = await this.postsDatabase
//     //         .getLikeDislike(likeDislikePostDB)
        
//     //     if (likeDislikeExist === POST_LIKE.ALREADY_LIKED) {

//     //         if (like) {
//     //             await this.postsDatabase.removeLikeDislike(likeDislikePostDB)
//     //             post.removeLike()
//     //         } else {
//     //             await this.postsDatabase.updateLikeDislike(likeDislikePostDB)
//     //             post.removeLike()
//     //             post.addDislike()
//     //         }
//     //     } else if (likeDislikeExist === POST_LIKE.ALREADY_DISLIKED) {
//     //         if (like) {
//     //             await this.postsDatabase.updateLikeDislike(likeDislikePostDB)
//     //             post.removeDislike()
//     //             post.addLike()
//     //         } else {
//     //             await this.postsDatabase.removeLikeDislike(likeDislikePostDB)
//     //             post.removeDislike()
//     //         }
//     //     } else {

//     //         await this.postsDatabase.likeOrDislikePost(likeDislikePostDB)

//     //         like ? post.addLike() : post.addDislike()

//     //     }

//     //     const updatePostDB = post.toDBModel()

//     //     await this.postsDatabase.updatePostById(idToLikeDislike, updatePostDB)
//     // }

// }
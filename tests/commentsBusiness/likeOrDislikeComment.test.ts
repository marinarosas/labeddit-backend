import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { CommentBusiness } from '../../src/business/CommentBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'
import { CommentsDatabase } from '../../src/database/CommentsDataBase'
import { GetCommentInputDTO } from '../../src/dtos/CommentDTO'
import { LikesDislikesInputDTO, LikesDislikesOutputDTO } from '../../src/dtos/LikesDislikesDTO'

describe("Like or Dislike Comment", ()=>{
    const commentBusiness = new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    // test("teste de pegar todos os comments", async()=>{
    //     const input: LikesDislikesInputDTO = {
    //         id: "id-mock",
    //         token: "token-mock-normal",
    //         like: true
    //     }

    //     const response: LikesDislikesOutputDTO = await commentBusiness.likeOrDislikeComment(input)
    //     expect(response.message).toEqual("Reação realizada com sucesso")

    // })

    test("dispara o erro se o 'token' for inválido", async()=>{
        expect.assertions(2)

        const input: LikesDislikesInputDTO = {
             id: "id-mock",
             token: undefined,
             like: true
         }
        
        expect(async () =>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async()=>{
        expect.assertions(2)

        const input: LikesDislikesInputDTO = {
             id: "id-mock",
             token: null as any as string,
             like: true
         }
        
        expect(async () =>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async ()=>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'like' não for um booleano", async()=>{
        expect.assertions(2)

        const input: LikesDislikesInputDTO = {
             id: "id-mock",
             token: "token-mock-normal",
             like: "true"
         }
        
        expect(async () =>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toThrow("'like' deve ser um booleano")

        expect(async ()=>{
            await commentBusiness.likeOrDislikeComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })
    
    // test("dispara o erro se o 'id' não for encontrado", async()=>{
    //     expect.assertions(2)

    //     const input: LikesDislikesInputDTO = {
    //          id: "id-mock",
    //          token: "token-mock-normal",
    //          like: true
    //      }
        
    //     expect(async () =>{
    //         await commentBusiness.likeOrDislikeComment(input)
    //     }).rejects.toThrow("Id não encontrado")

    //     expect(async ()=>{
    //         await commentBusiness.likeOrDislikeComment(input)
    //     }).rejects.toBeInstanceOf(NotFoundError)
    // })
})

//faltou payload error
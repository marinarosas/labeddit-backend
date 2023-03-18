import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { PostBusiness } from '../../src/business/PostBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { LikesDislikesInputDTO, LikesDislikesOutputDTO } from '../../src/dtos/LikesDislikesDTO'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Like e Dislike Posts", ()=>{
    const postBusiness = new PostBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )
    
    test("teste de desfazer like no post", async()=>{
        const input: LikesDislikesInputDTO = {
            id: "id-mock",
            token: "token-mock-normal",
            like: true
        }

        const response: LikesDislikesOutputDTO = await postBusiness.likeOrDislikePost(input)

        if(response)
        expect(response.message).toEqual("Reação realizada com sucesso")

    })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: LikesDislikesInputDTO = {
             id: "id-mock",
             token: undefined,
             like: true
         }

        expect(async () =>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.likeOrDislikePost(input)
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
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async ()=>{
            await postBusiness.likeOrDislikePost(input)
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
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("'like' deve ser um booleano")

        expect(async ()=>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'id' não for encontrado", async()=>{
        expect.assertions(2)

        const input: LikesDislikesInputDTO = {
             id: "id",
             token: "token-mock-normal",
             like: true
         }

        expect(async () =>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toThrow("Id não encontrado")

        expect(async ()=>{
            await postBusiness.likeOrDislikePost(input)
        }).rejects.toBeInstanceOf(NotFoundError)
    })

    

})
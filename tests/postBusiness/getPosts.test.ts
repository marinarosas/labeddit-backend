import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { PostBusiness } from '../../src/business/PostBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Get Posts", ()=>{
    const postBusiness = new PostBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )
    
    // test("teste de pegar todos os posts", async()=>{
    //     const input: GetPostInputDTO = {
    //         token: "token-mock-normal"
    //     }

    //     const output = [
    //         {
    //             id: "id-mock",
    //             content: "Que dia mais lindo! Calor, sol e mar...",
    //             likes: 0,
    //             dislikes: 0,
    //             creator: {
    //                 id: "id-mock",
    //                 nickname: "Normal Mock",
    //             },
    //             createdAt: expect.any(String),
    //             updatedAt: expect.any(String)
    //         },
    //         {
    //             id: "id-mock",
    //             content: "Feliz demais por essa semana! Muitas coisas por vir...",
    //             likes: 0,
    //             dislikes: 0,
    //             creator: {
    //                 id: "id-mock",
    //                 nickname: "Normal Mock",
    //             },
    //             createdAt: expect.any(String),
    //             updatedAt: expect.any(String)
    //         }
    //     ]

    //     const response: CreatePostOutputDTO[] = await postBusiness.getPosts(input)
    //     expect(response).toEqual(output)

    // })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: GetPostInputDTO = {
            token: undefined
        }

        expect(async () =>{
            await postBusiness.getPosts(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.getPosts(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: GetPostInputDTO = {
            token: ""
        }

        expect(async () =>{
            await postBusiness.getPosts(input)
        }).rejects.toThrow("'token'inválido")

        expect(async ()=>{
            await postBusiness.getPosts(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro se o 'usuário' ausente", async()=>{
    //     expect.assertions(2)

    //     const input: GetPostInputDTO = {
    //         token: "token-mock-normala"
    //     }

    //     expect(async () =>{
    //         await postBusiness.getPosts(input)
    //     }).rejects.toThrow("Usuário não encontrado")

    //     expect(async ()=>{
    //         await postBusiness.getPosts(input)
    //     }).rejects.toBeInstanceOf(NotFoundError)
    // })

})
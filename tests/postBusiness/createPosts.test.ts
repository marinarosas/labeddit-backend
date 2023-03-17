import { CreatePostInputDTO, CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { PostBusiness } from '../../src/business/PostBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'

describe("Get Posts", ()=>{
    const postBusiness = new PostBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    // test("testando se o post é criado com sucesso", async()=>{
    //     const input = {
    //         content: "Vamos para praia?",
    //         token: "token-mock-normal"
    //     }

    //     const response: CreatePostOutputDTO = await postBusiness.createPost(input)

    //     const output = {
    //             id: "id-mock",
    //             content: "Vamos para praia?",
    //             likes: 0,
    //             dislikes: 0,
    //             creator: {
    //                 id: "id-mock",
    //                 nickname: "Normal Mock"
    //             },
    //             createdAt: expect.any(String),
    //             updatedAt: expect.any(String) 
    //     }

    //     expect(response).toBe(output)
    // })

    test("dispara o erro se o 'token' não é valido", async()=>{
        expect.assertions(2)

        const input: CreatePostInputDTO = {
            content: "Vamos para a praia?",
            token: "token"
        }

        expect(async () =>{
            await postBusiness.createPost(input)
        }).rejects.toThrow("token não é valido")

        expect(async ()=>{
            await postBusiness.createPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async()=>{
        expect.assertions(2)

        const input: CreatePostInputDTO = {
            content: "Vamos para a praia?",
            token: undefined
        }

        expect(async () =>{
            await postBusiness.createPost(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.createPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro se o 'token' não for informado", async()=>{
    //     expect.assertions(2)

    //     const input: CreatePostInputDTO = {
    //         content: "Vamos para a praia?",
    //         token: null
    //     }

    //     expect(async () =>{
    //         await postBusiness.createPost(input)
    //     }).rejects.toThrow("'token' deve ser informado")

    //     expect(async ()=>{
    //         await postBusiness.createPost(input)
    //     }).rejects.toBeInstanceOf(BadRequestError)
    // })
})
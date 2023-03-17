import { CreatePostOutputDTO, EditPostInputDTO, EditPostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { PostBusiness } from '../../src/business/PostBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Edit Posts", ()=>{
    const postBusiness = new PostBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )
    
    // test("teste de pegar editar um post", async()=>{
    //     const input: EditPostInputDTO = {
    //         idToEdit: "id-mock",
    //         content: "Vamos para praia de Cotovelo?",
    //         token: "token-mock-normal"
    //     }

    //     const response: EditPostOutputDTO = await postBusiness.editPost(input)
    //     expect(response.message).toEqual("Post editado com sucesso")

    // })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            content: "Vamos para praia?",
            token: undefined
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            content: "Vamos para a praia?",
            token: null as any as string
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'id' não encontrado", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id",
            content: "Vamos para a praia?",
            token: "token-mock-normal"
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("'id' não encontrado")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(NotFoundError)
    })

    test("dispara o erro se o 'token' não valido", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            content: "Vamos para a praia?",
            token: "token"
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("token não é valido")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro somente quem criou o post pode editá-la", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            content: "Vamos para a praia?",
            token: "token-mock-normal"
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("somente quem criou o post pode editá-la")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

})
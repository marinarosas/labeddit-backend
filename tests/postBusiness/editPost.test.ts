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
    
    test("teste de pegar editar um post", async()=>{
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-normal",
            content: "Vamos para praia de Cotovelo?"
        }

        const response: EditPostOutputDTO = await postBusiness.editPost(input)
        expect(response.message).toEqual("Post editado com sucesso")

    })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: undefined,
            content: "Vamos para praia?"
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
            token: null as any as string,
            content: "Vamos para a praia?"
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
            token: "token-mock-normal",
            content: "Vamos para a praia?"
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
            token: "token",
            content: "Vamos para a praia?"
        }

        expect(async () =>{
            await postBusiness.editPost(input)
        }).rejects.toThrow("token não é valido")

        expect(async ()=>{
            await postBusiness.editPost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro somente quem criou o post pode editá-la", async()=>{
    //     expect.assertions(2)

    //     const input: EditPostInputDTO = {
    //         idToEdit: "id-mock",
    //         token: "token-mock-normal",
    //         content: "Vamos para a praia?"
    //     }

    //     expect(async () =>{
    //         await postBusiness.editPost(input)
    //     }).rejects.toThrow("somente quem criou o post pode editá-la")

    //     expect(async ()=>{
    //         await postBusiness.editPost(input)
    //     }).rejects.toBeInstanceOf(BadRequestError)
    // })

})
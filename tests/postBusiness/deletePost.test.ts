import { DeletePostInputDTO, EditPostOutputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { PostBusiness } from '../../src/business/PostBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Delete Posts", () => {
    const postBusiness = new PostBusiness(
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    test("teste de deletar um post", async()=>{

        const input: DeletePostInputDTO = {
            idToDelete: "id-mock",
            token: "token-mock-admin"
        }

        const response: EditPostOutputDTO = await postBusiness.deletePost(input)
        expect(response.message).toEqual("Post deletado com sucesso")

    })

    test("dispara o erro se o 'token' não valido", async () => {
        expect.assertions(2)

        const input: DeletePostInputDTO = {
            idToDelete: "id-mock",
            token: undefined
        }

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toThrow("'token' ausente")

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não valido", async () => {
        expect.assertions(2)

        const input: DeletePostInputDTO = {
            idToDelete: "id-mock",
            token: null as any as string
        }

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'id' não encontrado", async () => {
        expect.assertions(2)

        const input: DeletePostInputDTO = {
            idToDelete: "id",
            token: "token-mock-normal"
        }

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toThrow("Id não encontrado")

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toBeInstanceOf(NotFoundError)
    })

    test("dispara o erro se não for quem criou o post", async () => {
        expect.assertions(2)

        const input: DeletePostInputDTO = {
            idToDelete: "id-mock",
            token: "token-mock-normal"
        }

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toThrow("somente quem criou o post pode deletá-la")

        expect(async () => {
            await postBusiness.deletePost(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })


})
import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { CommentBusiness } from '../../src/business/CommentBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'
import { CommentsDatabase } from '../../src/database/CommentsDataBase'
import { CreateCommentInputDTO, CreateCommentsOutputDTO, EditCommentInputDTO, EditCommentOutputDTO, GetCommentInputDTO } from '../../src/dtos/CommentDTO'

describe("Get Posts", () => {
    const postBusiness = new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    // test("teste de editar um comment", async()=>{

    //     const input: EditCommentInputDTO = {
    //         idToEdit: "id-mock",
    //         token: "token-mock-normal",
    //         content: "To indo pra Cotovelo!"
    //     }

    //     const response: EditCommentOutputDTO = await postBusiness.editComment(input)

    //     expect(response.message).toEqual("Comentário editado com sucesso")

    // })

    test("dispara o erro se o 'token' ausente", async () => {
        expect.assertions(2)

        const input: EditCommentInputDTO = {
            idToEdit: "id-mock",
            token: undefined,
            content: "To indo pra Cotovelo!"
        }

        expect(async () => {
            await postBusiness.editComment(input)
        }).rejects.toThrow("'token' ausente")

        expect(async () => {
            await postBusiness.editComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async () => {
        expect.assertions(2)

        const input: EditCommentInputDTO = {
            idToEdit: "id-mock",
            token: null as any as string,
            content: "To indo pra Cotovelo!"
        }

        expect(async () => {
            await postBusiness.editComment(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async () => {
            await postBusiness.editComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro se o 'id' não for encontrado", async () => {
    //     expect.assertions(2)

    //     const input: EditCommentInputDTO = {
    //         idToEdit: "",
    //         token: "token-mock-normal",
    //         content: "To indo pra Cotovelo!"
    //     }

    //     expect(async () => {
    //         await postBusiness.editComment(input)
    //     }).rejects.toThrow("'id' não encontrado")

    //     expect(async () => {
    //         await postBusiness.editComment(input)
    //     }).rejects.toBeInstanceOf(NotFoundError)
    // })

    
})

//faltou teste de erro do payload e somente quem criou o comment pode editá-la


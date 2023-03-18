import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { CommentBusiness } from '../../src/business/CommentBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'
import { CommentsDatabase } from '../../src/database/CommentsDataBase'
import { CreateCommentInputDTO, CreateCommentsOutputDTO, DeleteCommentInputDTO, DeleteCommentOutputDTO, EditCommentInputDTO, EditCommentOutputDTO, GetCommentInputDTO } from '../../src/dtos/CommentDTO'

describe("Get Posts", () => {
    const postBusiness = new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    // test("teste de deletar um comment", async()=>{

    //     const input: DeleteCommentInputDTO = {
    //         idToDelete: "id-mock",
    //         token: "token-mock-normal"
    //     }

    //     const response: DeleteCommentOutputDTO = await postBusiness.deleteComment(input)

    //     expect(response.message).toEqual("Comment deletado com sucesso")

    // })

    test("dispara o erro se o 'token' ausente", async () => {
        expect.assertions(2)

        const input: DeleteCommentInputDTO = {
            idToDelete: "id-mock",
            token: undefined
        }

        expect(async () => {
            await postBusiness.deleteComment(input)
        }).rejects.toThrow("'token' ausente")

        expect(async () => {
            await postBusiness.deleteComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async () => {
        expect.assertions(2)

        const input: DeleteCommentInputDTO = {
            idToDelete: "id-mock",
            token: null as any as string
        }

        expect(async () => {
            await postBusiness.deleteComment(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async () => {
            await postBusiness.deleteComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro se o 'id' não encontrado", async () => {
    //     expect.assertions(2)

    //     const input: DeleteCommentInputDTO = {
    //         idToDelete: "id-moc",
    //         token: "token-mock-normal"
    //     }

    //     expect(async () => {
    //         await postBusiness.deleteComment(input)
    //     }).rejects.toThrow("Id não encontrado")

    //     expect(async () => {
    //         await postBusiness.deleteComment(input)
    //     }).rejects.toBeInstanceOf(NotFoundError)
    // })
    
})

// teste de erro payload e "somente quem criou o comment pode deletá-la"


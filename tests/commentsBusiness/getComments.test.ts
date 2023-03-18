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

describe("Get Comments", ()=>{
    const postBusiness = new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    test("teste de pegar todos os comments", async()=>{
        const input: GetCommentInputDTO = {
            postId: "p001",
            token: "token-mock-normal"
        }

        const output = [
                {
                    id: "id-mock",
                    postId: "p001",
                    content: "Que praia? To dentro!",
                    likes: 0,
                    dislikes: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    creator: {
                        id: "id-mock",
                        nickname: "Normal Mock",
                    }
                }
        ]

        const response: CreatePostOutputDTO[] = await postBusiness.getComments(input)
        expect(response).toEqual(output)

    })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: GetCommentInputDTO = {
            postId: "p001",
            token: undefined
        }

        expect(async () =>{
            await postBusiness.getComments(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.getComments(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'postId' ausente", async()=>{
        expect.assertions(2)

        const input: GetCommentInputDTO = {
            postId: undefined as any as string,
            token: "token-mock-normal"
        }

        expect(async () =>{
            await postBusiness.getComments(input)
        }).rejects.toThrow("'postId' ausente")

        expect(async ()=>{
            await postBusiness.getComments(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' for inválido", async()=>{
        expect.assertions(2)

        const input: GetCommentInputDTO = {
            postId: "p001",
            token: "token-mock-normal1"
        }

        expect(async () =>{
            await postBusiness.getComments(input)
        }).rejects.toThrow("'token'inválido")

        expect(async ()=>{
            await postBusiness.getComments(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'postId' não for encontrado", async()=>{
        expect.assertions(2)

        const input: GetCommentInputDTO = {
            postId: "p00",
            token: "token-mock-normal"
        }

        expect(async () =>{
            await postBusiness.getComments(input)
        }).rejects.toThrow("'postId' não encontrado")

        expect(async ()=>{
            await postBusiness.getComments(input)
        }).rejects.toBeInstanceOf(NotFoundError)
    })

    
})

//fazer erro de postId não tem comentário
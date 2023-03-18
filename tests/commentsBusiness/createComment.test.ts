import { CreatePostOutputDTO, GetPostInputDTO } from '../../src/dtos/PostDTO'
import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { CommentBusiness } from '../../src/business/CommentBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'
import { CommentsDatabase } from '../../src/database/CommentsDataBase'
import { CreateCommentInputDTO, CreateCommentsOutputDTO, GetCommentInputDTO } from '../../src/dtos/CommentDTO'

describe("Get Posts", ()=>{
    const postBusiness = new CommentBusiness(
        new CommentsDatabase(),
        new PostsDatabaseMock(),
        new IdGeneratorMock(),
        new UsersDatabaseMock(),
        new TokenManagerMock()
    )

    // test("teste de criar um comment", async()=>{
        
    //     const input: CreateCommentInputDTO = {
    //         content: "Que massa!",
    //         postId: "p001",
    //         token: "token-mock-normal"
    //     }

    //     const response: CreateCommentsOutputDTO = await postBusiness.createComment(input)

    //     const output: CreateCommentsOutputDTO =
    //             {
    //                 id: "id-mock",
    //                 postId: "p001",
    //                 content: "Que praia? To dentro!",
    //                 likes: 0,
    //                 dislikes: 0,
    //                 createdAt: expect.any(String),
    //                 updatedAt: expect.any(String),
    //                 creator: {
    //                     id: "id-mock",
    //                     nickname: "Normal Mock",
    //                 }
    //             }

    //     expect(response).toEqual(output)

    // })

    test("dispara o erro se o 'token' ausente", async()=>{
        expect.assertions(2)

        const input: CreateCommentInputDTO = {
                 content: "Que massa!",
                 postId: "p001",
                 token: undefined
             }

        expect(async () =>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'token' ausente")

        expect(async ()=>{
            await postBusiness.createComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'token' não for informado", async()=>{
        expect.assertions(2)

        const input: CreateCommentInputDTO = {
                 content: "Que massa!",
                 postId: "p001",
                 token: null as any
             }

        expect(async () =>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'token' deve ser informado")

        expect(async ()=>{
            await postBusiness.createComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'postId' não for informado", async()=>{
        expect.assertions(2)

        const input: CreateCommentInputDTO = {
                 content: "Que massa!",
                 postId: null as any,
                 token: "token-mock-normal"
             }

        expect(async () =>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'postId' deve ser informado")

        expect(async ()=>{
            await postBusiness.createComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })
    
    test("dispara o erro se o 'postId' não for informado", async()=>{
        expect.assertions(2)

        const input: CreateCommentInputDTO = {
                 content: "Que massa!",
                 postId: null as any,
                 token: "token-mock-normal"
             }

        expect(async () =>{
            await postBusiness.createComment(input)
        }).rejects.toThrow("'postId' deve ser informado")

        expect(async ()=>{
            await postBusiness.createComment(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    // test("dispara o erro se o 'token' não passar pelo payload", async()=>{
    //     expect.assertions(2)

    //     const input: CreateCommentInputDTO = {
    //              content: "Que massa!",
    //              postId: "p001",
    //              token: null as any
    //          }

    //     expect(async () =>{
    //         await postBusiness.createComment(input)
    //     }).rejects.toThrow("token não é valido")

    //     expect(async ()=>{
    //         await postBusiness.createComment(input)
    //     }).rejects.toBeInstanceOf(BadRequestError)
    // })
})

//como fazer teste de erro depois do payload
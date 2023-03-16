// import { GetPostInputDTO } from '../../src/dtos/PostDTO'
// import { PostsDatabaseMock } from '../mocks/PostsDatabaseMock'
// import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
// import { TokenManagerMock } from '../mocks/TokenManagerMock'
// import { PostBusiness } from '../../src/business/PostBusiness'
// import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
// import { CommentsDatabaseMock } from '../mocks/CommentsDatabaseMock'

// describe("Get Posts", ()=>{
//     const postBusiness = new PostBusiness(
//         new PostsDatabaseMock(),
//         new IdGeneratorMock(),
//         new CommentsDatabaseMock(),
//         new UsersDatabaseMock(),
//         new TokenManagerMock()
//     )
//     test("teste de pegar todos os posts", async()=>{
//         const input: GetPostInputDTO = {
//             token: "token-mock-admin"
//         }

//         const response = await postBusiness.getPosts(input)

//     })
// })
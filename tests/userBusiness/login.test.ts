import { UserBusiness } from '../../src/business/UserBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { LoginInputDTO, LoginOutputDTO } from '../../src/dtos/UserDTO'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Login", () => {
    const userBusiness = new UserBusiness(
        new UsersDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
   
    test("testar login de um usuario NORMAL", async () =>{
        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: "Bris@1234"
        }

        const response: LoginOutputDTO = await userBusiness.login(input)

        const token = "token-mock-normal"

        expect(response.token).toBe(token)
    })

    test("testar login de um usuario ADMIN", async () =>{
        const input: LoginInputDTO = {
            email: "admin@email.com",
            password: "Bris@1234"
        }

        const response: LoginOutputDTO = await userBusiness.login(input)

        const token = "token-mock-admin"

        expect(response.token).toBe(token)
    })
    
    // test("deve disparar erro caso o email não seja um string", () =>{
    //     expect.assertions(2)

    //     const input: LoginInputDTO = {
    //         email: 87686,
    //         password: "brisa"
    //     }

    //     expect(async () =>{
    //         await userBusiness.login(input)
    //     }).rejects.toThrow("'email' deve ser string")

    //     expect(async () =>{
    //         await userBusiness.login(input)
    //     }).rejects.toBeInstanceOf(BadRequestError)
    // })

    test("dipara erro caso o e-mail esteja incorreto", () =>{

        expect.assertions(2)

        const input: LoginInputDTO = {
            email: "normal1@email.com",
            password: "Bris@1234"
        }

        expect(async () =>{
            await userBusiness.login(input)
        }).rejects.toThrow( "'email' não encontrado")

        expect(async () =>{
            await userBusiness.login(input)
        }).rejects.toBeInstanceOf(NotFoundError)
    })

    test("dispara erro se o password estiver errado", () =>{
        expect.assertions(2)

        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: "brisa2"
        }

        expect(async () =>{
            await userBusiness.login(input)
        }).rejects.toThrow("password está incorreto")

        expect(async ()=>{
            await userBusiness.login(input)
        }).rejects.toBeInstanceOf(BadRequestError)
        
    })

})
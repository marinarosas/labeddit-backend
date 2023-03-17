import { UserBusiness } from '../../src/business/UserBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from '../../src/dtos/UserDTO'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Singup", ()=>{
    const userBusiness = new UserBusiness(
        new UsersDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("testando se o cadastro é realizado com sucesso", async()=>{
        const input = {
            nickname: "Normal Mock",
            email: "normal@email.com",
            password: "Bris@1234"
        }

        const response: SignupOutputDTO = await userBusiness.signup(input)

        expect(response.token).toBe("token-mock-normal")
    })

    test("dispara o erro se o 'nickname' possuir menos de 2 caracteres ", async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "N",
            email: "normal@email.com",
            password: "Bris@1234"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'nickname' deve possuir pelo menos 2 caracteres")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'email' não possuir o parametro regex ", async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "Normal Mock",
            email: "n",
            password: "Bris@1234"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("Parâmetro de 'email' inválido")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o 'password' possuir menos de 8 caracteres ", async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "Normal Mock",
            email: "normal@email.com",
            password: "brisa2"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'password' tem que ter mais de 8 caracteres")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o parametro do 'email' estiver errado", async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "Normal Mock",
            email: "normalemail.com",
            password: "Bris@1234"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("Parâmetro de 'email' inválido")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o parametro do 'password' estiver errado" , async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "Normal Mock",
            email: "normal@email.com",
            password: "brisa2"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'password' tem que ter mais de 8 caracteres")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })

    test("dispara o erro se o parametro do 'password' estiver errado" , async()=>{
        expect.assertions(2)

        const input: SignupInputDTO = {
            nickname: "Normal Mock",
            email: "normal@email.com",
            password: "brisa208098"
        }

        expect(async () =>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toBeInstanceOf(BadRequestError)
    })
})
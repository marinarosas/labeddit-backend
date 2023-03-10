import { UserBusiness } from '../../src/business/UserBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { LoginInputDTO, LoginOutputDTO } from '../../src/dtos/UserDTO'

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
            password: "bananinha"
        }

        const response: LoginOutputDTO = await userBusiness.login(input)

        const token = "token-mock-normal"

        expect(response.token).toBe(token)
    })
        

})
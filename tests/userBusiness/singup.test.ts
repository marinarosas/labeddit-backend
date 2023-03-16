import { UserBusiness } from '../../src/business/UserBusiness'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerMock } from '../mocks/TokenManagerMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { LoginInputDTO, LoginOutputDTO } from '../../src/dtos/UserDTO'
import { BadRequestError } from '../../src/errors/BadRequestError'
import { NotFoundError } from '../../src/errors/NotFoundError'

describe("Singup", ()=>{
    const userBusiness = new UserBusiness(
        new UsersDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("", ()=>{
        
    })
})
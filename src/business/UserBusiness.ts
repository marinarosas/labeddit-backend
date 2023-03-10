import { regexEmail, regexPassword } from "../constant/regex";
import { UsersDatabase } from "../database/UsersDatabase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES, TokenPayload } from "../types";

export class UserBusiness {
    constructor(
        private usersDatabase: UsersDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }


    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { nickname, email, password } = input

        if(nickname.length < 2){
            throw new BadRequestError("Email deve possuir pelo menos 2")
        }

        if(password.length < 8){
            throw new BadRequestError("'password' tem que ter mais de 8 caracteres")
        }

        if (!email.match(regexEmail)) {
            throw new BadRequestError("Parâmetro de 'email' inválido")
        }

        if (!password.match(regexPassword)) {
            throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const hashPassword = await this.hashManager.hash(password)
        const id = this.idGenerator.generate()

        const newUser = new User(
            id,
            nickname,
            email,
            hashPassword,
            USER_ROLES.NORMAL, // só é possível criar users com contas normais
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        
        await this.usersDatabase.insertUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            nickname: newUser.getNickName(),
            role: newUser.getRole()
        }
        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.usersDatabase.getUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.nickname,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at,
            userDB.updated_at
        )

        const passwordCompare = await this.hashManager.compare(password, user.getPassword())

        if (!passwordCompare) {
            throw new BadRequestError("password está incorreto")
        }

        const tokenPayload: TokenPayload = {
            id: user.getId(),
            nickname: user.getNickName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: LoginOutputDTO = {
            token
        }

        return output
    }
}
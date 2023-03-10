import { BadRequestError } from "../errors/BadRequestError"

export interface SignupInputDTO {
    nickname: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}

export class UserDTO {

    public singupInput(
        nickname: unknown,
        email: unknown,
        password: unknown
    ): SignupInputDTO {

        if (typeof nickname !== "string") throw new BadRequestError("'nickname' deve ser string")

        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")


        const dto: SignupInputDTO = {
            nickname,
            email,
            password
        }

        return dto
    }

    public loginInput(
        email: unknown,
        password: unknown
    ): LoginInputDTO {

        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")

        const dto = {
            email,
            password
        }

        return dto

    }
}

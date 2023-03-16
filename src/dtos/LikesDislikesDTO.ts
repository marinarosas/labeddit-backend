import { BadRequestError } from "../errors/BadRequestError"

export interface LikesDislikesInputDTO{
    id: string,
    token: string | undefined,
    like: unknown
}

export interface LikesDislikesOutputDTO{
    message: string
}

export class LikeDislikeDTO {
    
    public likesDislikesPostInput(
        id: unknown,
        token: unknown,
        like: unknown
    ): LikesDislikesInputDTO {

        if (typeof token !== "string") throw new BadRequestError("'token' deve ser string")

        if (typeof id !== "string") throw new BadRequestError("'id' deve ser string")

        if (typeof like !== "boolean") throw new BadRequestError("'like' deve ser um boolean")


        const dto: LikesDislikesInputDTO = {
            id,
            token,
            like
        }
        return dto
    }
}
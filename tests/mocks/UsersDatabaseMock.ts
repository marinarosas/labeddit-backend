import { USER_ROLES } from "../../src/types";
import { UserDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class UsersDatabaseMock extends BaseDatabase {

    public static TABLE_USERS = "users"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async getAllUsers(): Promise<UserDB[]> {
        return [
            {
                id: "id-mock",
                nickname: "Normal Mock",
                email: "normal@email.com",
                password: "hash-brisa",
                role: USER_ROLES.NORMAL,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            },
            {
                id: "id-mock",
                nickname: "Admin Mock",
                email: "admin@email.com",
                password: "hash-brisa",
                role: USER_ROLES.ADMIN,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ]
    }

    public async getUserByName(q: string): Promise <UserDB[] | undefined>{
        if (q === "Normal") {
            return [
                {
                    id: "id-mock",
                    nickname: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-brisa",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ]
        }
    }

    public async getUserById(id: string | undefined): Promise<UserDB | undefined> {
        if(id === "id-mock"){
            return (
                {
                    id: "id-mock",
                    nickname: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-brisa",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
        } else{
            return undefined
        }
    }

    public async getUserByEmail(email: string | undefined): Promise<UserDB | undefined> {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    nickname: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-brisa",
                    role: USER_ROLES.NORMAL,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    nickname: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-brisa",
                    role: USER_ROLES.ADMIN,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()

                }
            default:
                return undefined
        }
    }

    public async insertUser(newUserDB: UserDB): Promise<void> {
        //não precisa retornar nada porque é void
    }

    public async updateUserById(newUserDB: UserDB): Promise<void> {
        //não precisa retornar nada porque é void

    }

    public async deleteUser(id: string): Promise<void> {
        //não precisa retornar nada porque é void

    }

}


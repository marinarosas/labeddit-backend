import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{

    public static TABLE_USERS = "users"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async getAllUsers(): Promise<UserDB[]>{
       return await BaseDatabase.connection(UsersDatabase.TABLE_USERS)
    }

    public async getUserByName (q: string | undefined): Promise <UserDB[] | undefined>{
        return await BaseDatabase.connection(UsersDatabase.TABLE_USERS).where("content", "LIKE", `%${q}%`)
    }

    public async getUserById(id: string | undefined): Promise <UserDB | undefined>{
        const [userDBExist]: UserDB[] | undefined[] = await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .select()
        .where({id})
        return userDBExist
    }

    public async getUserByEmail(email: string | undefined): Promise <UserDB | undefined>{
        const [emailUserDBExist]: UserDB[] | undefined[] = await BaseDatabase
        .connection (UsersDatabase.TABLE_USERS)
        .select()
        .where({email})
        return emailUserDBExist
    }

    public async insertUser(newUserDB: UserDB): Promise <void>{
        await BaseDatabase.connection(UsersDatabase.TABLE_USERS).insert(newUserDB)
    }

    public async updateUserById(newUserDB: UserDB): Promise <void>{
        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .update(newUserDB)
        .where({id: newUserDB.id})
    }

    public async deleteUser(id: string): Promise<void>{
        await BaseDatabase
        .connection(UsersDatabase.TABLE_LIKESDISLIKES)
        .del()
        .where({user_id:id})

        await BaseDatabase
        .connection(UsersDatabase.TABLE_USERS)
        .del()
        .where({id})    
    }

}
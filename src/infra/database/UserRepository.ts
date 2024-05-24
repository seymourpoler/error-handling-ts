import { User } from "../../domain/User";
import { FindUserResult } from "../../application/FindUserResult";

export class UserRepository {
    private readonly users: Array<User> = []
    
    exists(user: User): boolean {
        return this.users.find(u => u.username === user.username) !== undefined
    }

    countOfAdmins(): number {
        return this.users.filter(u => u.isAdmin()).length
    }

    find(username: string) : FindUserResult {
        throw new Error("Method not implemented.");
    }
}

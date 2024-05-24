import { User } from "../../domain/User";
import { CreateUserResult } from "../../application/User/CreateUserResult";

export class UserRepository {
    private readonly users: Array<User> = []
    
    exists(user: User): boolean {
        return this.users.find(u => u.username === user.username) !== undefined
    }

    countOfAdmins(): number {
        return this.users.filter(u => u.isAdmin()).length
    }

    save(user: User): CreateUserResult {
        throw new Error("Method not implemented.");
    }

    find(username: string) : User | null {
        throw new Error("Method not implemented.");
    }
}

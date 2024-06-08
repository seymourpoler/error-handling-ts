import { ConnectionFactory } from "./ConnectionFactory";
import { User } from "../../domain/User";
import { CreateUserResult } from "../../application/User/CreateUserResult";

export class UserRepository {
    private readonly users: Array<User> = []
    private readonly connectionFactory: ConnectionFactory;

    public constructor(connectionFactory: ConnectionFactory){
        this.connectionFactory = connectionFactory;
    }

    exists(user: User): boolean {
        return this.users.find(u => u.email === user.email) !== undefined
    }

    countOfAdmins(): number {
        return this.users.filter(u => u.isAdmin()).length
    }

    save(user: User): CreateUserResult {
        throw new Error("Method not implemented.");
    }

    public async find(email: string) : Promise<User | null> {
        const connection = this.connectionFactory.create();

        const users = await connection<User[]>`
              SELECT *
             FROM public.users
             WHERE users.email = ${email + '%'}`;

        if(users.length === 0){
            return null;
        }

        return users[0]
    }
}

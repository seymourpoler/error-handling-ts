import { ConnectionFactory } from "./ConnectionFactory";
import { User } from "../../domain/User";
import { CreateUserResult } from "../../application/User/CreateUserResult";

export interface IUserRepository {
    exists(user: User): boolean;
    countOfAdmins(): number;
    save(user: User): CreateUserResult;
    find(email: string) : Promise<User | null>;
}

export class PostgresUserRepository implements IUserRepository {
    private readonly users: Array<User> = []
    private readonly connectionFactory: ConnectionFactory;

    public constructor(connectionFactory: ConnectionFactory){
        this.connectionFactory = connectionFactory;
    }

    public exists(user: User): boolean {
        return this.users.find(u => u.email === user.email) !== undefined
    }

    public countOfAdmins(): number {
        return this.users.filter(u => u.isAdmin()).length
    }

    public save(user: User): CreateUserResult {
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

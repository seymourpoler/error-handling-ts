import { ConnectionFactory } from "./ConnectionFactory";
import { User } from "../../domain/User";
import { CreateUserResult } from "../../application/User/CreateUserResult";

export interface UserRepository {
    exists(user: User): boolean;
    countOfAdmins(): number;
    save(user: User): Promise<CreateUserResult> ;
    find(email: string) : Promise<User | null>;
    delete(email: string): Promise<void>
}

export class PostgresUserRepository implements UserRepository {
    private readonly users: Array<User> = []
    private readonly connectionFactory: ConnectionFactory;

    public constructor(connectionFactory: ConnectionFactory){
        this.connectionFactory = connectionFactory;
    }

    public exists(user: User): boolean {
        return this.users.find(u => u.email === user.email) !== undefined
    }

    public countOfAdmins(): number {
        const administrators = this.users.filter(u => u.isAdmin());
        return administrators.length
    }

    public async save(user: User): Promise<CreateUserResult> {
        const connection = this.connectionFactory.create();
        const users = await connection`
            INSERT 
            INTO public.users (email, password, role)
            VALUES (${user.email}, ${user.password}, ${user.role})`;
        
        return CreateUserResult.success();
    }

    public async find(email: string) : Promise<User | null> {
        const connection = this.connectionFactory.create();
        const users = await connection<User[]>`
            SELECT *
            FROM public.users
            WHERE users.email = % ${email} %`;

        if(users.length === 0){
            return null;
        }

        return users[0]
    }

    public async delete(email: string): Promise<void> {
        const connection = this.connectionFactory.create();
        const users = await connection`
            DELETE
            FROM public.users
            WHERE users.email = % ${email} %`;
    }
}

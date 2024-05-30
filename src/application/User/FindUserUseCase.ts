import { User } from "../../domain/User";
import { UserRepository } from "../../infra/database/UserRepository";

export class FindUserUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(args: FindUserArgs) : Promise<User> {
        return this.userRepository.find(args.username) as User;
    }
}

export type FindUserArgs = {
    username: string;
}
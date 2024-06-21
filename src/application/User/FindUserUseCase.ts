import { User } from "../../domain/User";
import { UserRepository } from "../../infra/database/PostgresUserRepository";
import { Either } from "../../domain/Either";

export class FindUserUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(args: FindUserArgs) : Promise<Either<Error,User>> {
        const user = await this.userRepository.find(args.username);
        if(user){
            return Either.createRight(user);
        }
        return Either.createLeft(new Error("User not found"));
    }
}

export type FindUserArgs = {
    username: string;
}
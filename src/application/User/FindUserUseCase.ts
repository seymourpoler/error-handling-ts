import { User } from "../../domain/User";
import { UserRepository } from "../../infra/database/UserRepository";
import { Either } from "../../domain/Either";

export class FindUserUseCase {
    constructor(private userRepository: UserRepository) {}

    public async execute(args: FindUserArgs) : Promise<Either<Error,User>> {
        const user = this.userRepository.find(args.username) as User;
        if(user){
            return Either.createRight(user);
        }
        return Either.createLeft(new Error("User not found"));
    }
}

export type FindUserArgs = {
    username: string;
}
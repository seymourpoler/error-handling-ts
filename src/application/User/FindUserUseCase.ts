import { User } from "../../domain/User";
import { UserRepository } from "../../infra/database/UserRepository";

export class FindUserUseCase{
    constructor(private userRepository: UserRepository) {}

    public async execute(data: { username: string }) : Promise<User | null> {
        return this.userRepository.find(data.username);
    }
}
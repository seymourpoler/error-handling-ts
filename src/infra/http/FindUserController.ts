import { Request, Response } from 'express';
import { FindUserUseCase, FindUserArgs } from "../../application/User/FindUserUseCase";

export class FindUserController {
    constructor(private readonly findUserUseCase: FindUserUseCase) {}

    public async execute(request: Request, response: Response) : Promise<Response> {
        const { username } = request.params;

        const args = { username } as FindUserArgs;
        const user = await this.findUserUseCase.execute(args);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    }
}
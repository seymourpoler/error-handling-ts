import { Request, Response } from 'express';
import { FindUserUseCase, FindUserArgs } from "../../application/User/FindUserUseCase";

export class FindUserController {
    constructor(private readonly findUserUseCase: FindUserUseCase) {}

    public async execute(request: Request, response: Response) : Promise<Response> {
        const username  = request.body.username;

        const args : FindUserArgs = { username : username };
        const user = await this.findUserUseCase.execute(args);

        return user.fold(
            user => response.status(200).json(user),
            () => response.status(404).json({ message: 'User not found' })
        );
    }
}
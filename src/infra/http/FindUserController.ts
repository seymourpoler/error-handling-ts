import { FindUserUseCase } from "../../application/User/FindUserUseCase";

export class FindUserController {
    constructor(private readonly findUserUseCase: FindUserUseCase) {}

    public async execute(request: Request, response: Response): Response {
        const { username } = request.params;

        const user = await this.findUserUseCase.execute({ username });

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    }
}
import { Request, Response } from 'express'
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { User } from "../../domain/User";
import { EmptyDataNotAllowedError, PasswordTooShortError } from "../../application/Errors";
import { AppError } from "../../application/CreateUserResult";


export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    // @ts-ignore we put this because ts intellisense is not smart enough to understand that we are covering all return cases
    public async execute(request: Request, response: Response): Response {
        const { username, password, role } = request.body

        try {
            const newUser = new User(username, password, role);
            const createUserResult = this.createUserUseCase.execute(newUser)

            switch (createUserResult.error) {
                case null:
                    return response.status(201).send()
                case AppError.UserAlreadyExists:
                    return response.status(400).send('User already exists.')
                case AppError.CannotCreateMoreAdmins:
                    return response.status(400).send('Too many admins.')
                case AppError.CannotSaveUser:
                    return response.status(500).send('Cannot create user.')
            }
        } catch (error) {
            if (error instanceof PasswordTooShortError) {
                return response.status(400).send('Password is too short.')
            }
            if (error instanceof EmptyDataNotAllowedError) {
                return response.status(400).send('Username and password cannot be empty.')
            }
            return response.status(500).send((error as Error).message)
        }
    }
}

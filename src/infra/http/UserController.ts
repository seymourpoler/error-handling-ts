import { Request, Response } from 'express'
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { User } from "../../domain/User";
import { AppError } from "../../application/CreateUserResult";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    // @ts-ignore we put this because ts intellisense is not smart enough to understand that we are covering all return cases
    public async execute(req: Request, res: Response): Response {
        const { username, password, role } = req.body

        const userResult = User.create(username, password, role)
        if (!userResult.isSuccess()) {
            switch (userResult.error()) {
                case AppError.EmptyDataNotAllowed:
                    return res.status(400).send('Username and password cannot be empty.')
                case AppError.PasswordTooShort:
                    return res.status(400).send('Password too short.')
            }
        }

        const createUserResult = this.createUserUseCase.execute(userResult.value()!)
        switch (createUserResult.error) {
            case null:
                return res.status(201).send()
            case AppError.UserAlreadyExists:
                return res.status(400).send('User already exists.')
            case AppError.CannotCreateMoreAdmins:
                return res.status(400).send('Too many admins.')
            case AppError.CannotSaveUser:
                return res.status(500).send('Cannot create user.')
        }
    }
}

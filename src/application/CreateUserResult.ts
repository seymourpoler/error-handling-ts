
export enum AppError {
    UserAlreadyExists = 'UserAlreadyExists',
    CannotCreateMoreAdmins = 'CannotCreateMoreAdmins',
    CannotSaveUser = 'CannotSaveUser',
    EmptyDataNotAllowed = 'EmptyDataNotAllowed',
    PasswordTooShort = 'PasswordTooShort',
}

export class CreateUserResult {
    private constructor(readonly error: AppError | null = null) {}

    isSuccess(): boolean {
        return this.error === null
    }

    static success() {
        return new CreateUserResult()
    }

    static userAlreadyExists(): CreateUserResult {
        return new CreateUserResult(AppError.UserAlreadyExists)
    }

    static cannotCreateMoreAdmins() {
        return new CreateUserResult(AppError.CannotCreateMoreAdmins)
    }

    static cannotSaveUser() {
        return new CreateUserResult(AppError.CannotSaveUser)
    }
}

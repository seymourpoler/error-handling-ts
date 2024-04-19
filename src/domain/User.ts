import { Result } from "../exercise2/Result";
import { AppError } from "../application/CreateUserResult";

export class User {
    constructor(
        readonly username: string,
        readonly password: string,
        readonly role: UserRole
    ) {}

    isAdmin(): boolean {
        return this.role === UserRole.ADMIN
    }

    static create(username: string, password: string, role: string): Result<User> {
        if (isNullOrEmpty(username) || isNullOrEmpty(password)) {
            return Result.failure(AppError.EmptyDataNotAllowed)
        }
        if (password.length < 8) {
            return Result.failure(AppError.PasswordTooShort)
        }

        return Result.success(new User(username, password, userRoleFrom(role)))
    }
}

function isNullOrEmpty(value: string): boolean {
    return value === null || value === ''
}

export enum UserRole {
    ADMIN = 'admin',
    STANDARD = 'standard',
}

function userRoleFrom(role: string): UserRole {
    if (role === 'admin') {
        return UserRole.ADMIN
    }

    if (role === 'standard') {
        return UserRole.STANDARD
    }

    throw new Error('Invalid role')
}

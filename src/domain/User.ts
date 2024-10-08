import { EmptyDataNotAllowedError, PasswordTooShortError } from "../application/Errors";

export class User {
    public readonly email: string
    public readonly password: string
    public readonly role: UserRole

    constructor(
        email: string,
        password: string,
        role: string
    ) {
        if (isNullOrEmpty(email) || isNullOrEmpty(password)) {
            throw new EmptyDataNotAllowedError()
        }
        if (password.length < 8) {
            throw new PasswordTooShortError()
        }

        this.email = email
        this.password = password
        this.role = userRoleFrom(role)
    }
    isAdmin(): boolean {
        return this.role === UserRole.ADMIN
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

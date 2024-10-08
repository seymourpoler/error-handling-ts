import * as TypeMoq from "typemoq";
import { describe, beforeEach, it, expect } from "vitest";
import { UserRepository } from '../../../src/infra/database/PostgresUserRepository';
import { CreateUserUseCase } from '../../../src/application/User/CreateUserUseCase';
import { User } from '../../../src/domain/User';
import { CreateUserResult } from '../../../src/application/User/CreateUserResult';
import { AppError } from "../../../src/application/AppError";


describe('Use case: create a user should', () => {
    let repository : TypeMoq.IMock<UserRepository>;
    let createUser: CreateUserUseCase;

    beforeEach(() => { 
        repository =  TypeMoq.Mock.ofType<UserRepository>();
        createUser = new CreateUserUseCase(repository.object)
    });

    it('return error, when the user already exist', () =>{
        const anyUser = new User('a@name.es', 'a password', 'admin');
        repository.setup(x => x.exists(anyUser)).returns(() => true);
        
        const result = createUser.execute(anyUser);
        
        expect(result.error).toBe(AppError.UserAlreadyExists);
    });

    it('return error, when there are more than two admins', () =>{
        const anyUser = new User('a@name.es', 'a password', 'admin');
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 3);
        
        const result = createUser.execute(anyUser);
        
        expect(result.error).toBe(AppError.CannotCreateMoreAdmins);
    });

    it('create an admin user user', () =>{
        const anyUser = new User('a@name.es', 'a password', 'admin');
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 0);
        repository.setup(x => x.save(anyUser)).returns(() => CreateUserResult.success());

        const result = createUser.execute(anyUser);
        
        expect(result.error).toBeNull();
    });

    it('create an non admin user user', () =>{
        const anyUser = new User('a@name.es', 'a password', 'standard');
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 0);
        repository.setup(x => x.save(anyUser)).returns(() => CreateUserResult.success());

        const result = createUser.execute(anyUser);
        
        expect(result.error).toBeNull();
    });
});
import * as TypeMoq from "typemoq";
import{ UserRepository } from '../../src/infra/database/UserRepository';
import { CreateUserUseCase } from '../../src/application/CreateUserUseCase';
import { User } from '../../src/domain/User';
import { AppError, CreateUserResult } from "../../src/application/CreateUserResult";

describe('Use case: create a user should', () => {
    let repository : TypeMoq.IMock<UserRepository>; 
    let createUser: CreateUserUseCase;

    beforeEach(() => { 
        repository =  TypeMoq.Mock.ofType<UserRepository>();
        createUser = new CreateUserUseCase(repository.object)
    });

    it('return error, when the user already exist', () =>{
        const anyUser = new User("a name", "a password", "admin");
        repository.setup(x => x.exists(anyUser)).returns(() => true);
        
        const result = createUser.execute(anyUser);
        
        expect(result.error).toBe(AppError.UserAlreadyExists);
    });

    it('return error, when there are more than two admins', () =>{
        const anyUser = new User("a name", "a password", "admin");
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 3);
        
        const result = createUser.execute(anyUser);
        
        expect(result.error).toBe(AppError.CannotCreateMoreAdmins);
    });

    it('create an admin user user', () =>{
        const anyUser = new User("a name", "a password", "admin");
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 0);
        repository.setup(x => x.save(anyUser)).returns(() => CreateUserResult.success());

        const result = createUser.execute(anyUser);
        
        expect(result.error).toBeNull();
    });

    it('create an non admin user user', () =>{
        const anyUser = new User("a name", "a password", "standard");
        repository.setup(x => x.exists(anyUser)).returns(() => false);
        repository.setup(x => x.countOfAdmins()).returns(() => 0);
        repository.setup(x => x.save(anyUser)).returns(() => CreateUserResult.success());

        const result = createUser.execute(anyUser);
        
        expect(result.error).toBeNull();
    });
});
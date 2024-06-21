import * as TypeMoq from "typemoq";
import { describe, beforeEach, it, expect } from "vitest";
import { UserRepository } from '../../../src/infra/database/PostgresUserRepository';
import { FindUserUseCase } from '../../../src/application/User/FindUserUseCase';

describe('FindUser Should', () => {
  let userRepository: TypeMoq.IMock<UserRepository>;
  let findUserUseCase: FindUserUseCase;

  beforeEach(() => {
    userRepository = TypeMoq.Mock.ofType<UserRepository>();
    findUserUseCase = new FindUserUseCase(userRepository.object);
  });

    it('return error, if user is not found', async () => {
      const username = 'any-user-name';
      userRepository.setup(u => u.find(username)).returns(() => null);
      
      const result = await findUserUseCase.execute({ username });

      result.fold(
        () => { throw new Error('User not found'); },
        (error: Error) => { expect(error).toBeInstanceOf(Error); }
      );
    });
});
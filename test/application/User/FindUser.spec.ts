import * as TypeMoq from "typemoq";
import { UserRepository } from '../../../src/infra/database/UserRepository';
import { FindUserUseCase } from '../../../src/application/User/FindUserUseCase';
import { FindUserResult } from "../../../src/application/User/FindUserResult";

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

      expect(result).toBe(null);
    });
});
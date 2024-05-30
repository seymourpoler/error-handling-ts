import * as TypeMoq from 'typemoq';
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { FindUserUseCase } from "../../../src/application/User/FindUserUseCase";
import { FindUserController } from '../../../src/infra/http/FindUserController';
import { User } from '../../../src/domain/User';

describe('FindUserUseCase Should', () => {
    let findUser: TypeMoq.IMock<FindUserUseCase>;
    let controller: FindUserController;

  beforeEach(() => {
    findUser = TypeMoq.Mock.ofType<FindUserUseCase>();
    controller = new FindUserController(findUser.object);
  });

  it('return error, if user is not found', async () => {
    const username = 'any-user-name';
    const anyRequest: MockRequest<Request> = createRequest({body:{username}});
    const anyResponse: MockResponse<Response> = createResponse();

    const response = await controller.execute(anyRequest, anyResponse);

    expect(response.statusCode).toBe(404)
  });

  it('return user, if user is found', async () => {
    const username = 'any-user-name';
    const anyRequest: MockRequest<Request> = createRequest({body:{username}});
    const anyResponse: MockResponse<Response<User>> = createResponse();
    const anyUser = new User('any-user-name', 'any-password', 'admin');
    findUser.setup(x => x.execute(TypeMoq.It.isAny())).returns(() => anyUser);

    const response = await controller.execute(anyRequest, anyResponse);

    expect(response.statusCode).toBe(200);
  });
});
import * as TypeMoq from 'typemoq';
import { describe, beforeEach, it, expect } from "vitest";
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { FindUserUseCase } from "../../../src/application/User/FindUserUseCase";
import { FindUserController } from '../../../src/infra/http/FindUserController';
import { User } from '../../../src/domain/User';
import { Either } from '../../../src/domain/Either';
import { json } from 'stream/consumers';

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
    const userNotFoundError = Promise.resolve(Either.createLeft<Error, User>(new Error('User not found')));
    findUser.setup(x => x.execute(TypeMoq.It.isAny())).returns(() => userNotFoundError);

    const response = await controller.execute(anyRequest, anyResponse);

    expect(response.statusCode).toBe(404);
    expect(response._getData()).toBe(JSON.stringify({ message: 'User not found' }));
  });

  it('return user, if user is found', async () => {
    const username = 'any-user-name';
    const anyRequest: MockRequest<Request> = createRequest({body:{username}});
    const anyResponse: MockResponse<Response<User>> = createResponse();
    const expectedUser = new User('any-user-name', 'any-password', 'admin');
    const anyUser = Either.createRight<Error, User>(expectedUser);
    findUser.setup(x => x.execute(TypeMoq.It.isAny())).returns(() => Promise.resolve(anyUser));

    const response = await controller.execute(anyRequest, anyResponse);

    expect(response.statusCode).toBe(200);
    expect(response._getData()).toBe(JSON.stringify(expectedUser));
  });
});
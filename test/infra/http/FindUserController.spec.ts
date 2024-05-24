import * as TypeMoq from 'typemoq';
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { FindUserUseCase } from "../../../src/application/User/FindUserUseCase";
import { FindUserController } from '../../../src/infra/http/FindUserController';

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

    const response = await controller.execute({ username });

    expect(response.statusCode).toBe(400)
  });

}
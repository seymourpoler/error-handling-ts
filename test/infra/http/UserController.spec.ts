import * as TypeMoq from "typemoq";
import { CreateUserUseCase } from '../../../src/application/CreateUserUseCase';
import { UserController } from '../../../src/infra/http/UserController';
import { Request, Response } from 'express';
import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';
import { CreateUserResult } from "../../../src/application/CreateUserResult";

describe('User Controller should', () =>{
    let useCase: TypeMoq.IMock<CreateUserUseCase>;
    let controller : UserController;

    beforeEach(() =>{
        useCase = TypeMoq.Mock.ofType<CreateUserUseCase>();
        controller = new UserController(useCase.object);
    });

    it('return 400 error when user is already exists', async () =>{
        useCase.setup(x => x.execute(TypeMoq.It.isAny()))
                .returns(() => CreateUserResult.userAlreadyExists());

        const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'password', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(400)
    });

    it('return 400 error when user is empty', async () =>{
        const anyRequest: MockRequest<Request> = createRequest({body:{username:'', password:'password', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(400)
    });

    it('return 400 error when password is empty', async () =>{
        const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(400)
    });

    it('return 400 error when password is too short', async () =>{
        const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'1234567', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(400)
    });

    it('return 500 error when role is empty', async () =>{
        const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'password', role:''}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(500)
    });

    it('return 500 error', async () => {
        useCase.setup(x => x.execute(TypeMoq.It.isAny()))
                .returns(() => CreateUserResult.cannotSaveUser());

                const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'password', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(500)
    });

    it('return 201', async () => {
        useCase.setup(x => x.execute(TypeMoq.It.isAny()))
                .returns(() => CreateUserResult.success());

                const anyRequest: MockRequest<Request> = createRequest({body:{username:'username', password:'password', role:'admin'}});
        const anyResponse: MockResponse<Response> = createResponse();
        const response = await controller.execute(anyRequest, anyResponse);

        expect(response.statusCode).toBe(201)
    });

});
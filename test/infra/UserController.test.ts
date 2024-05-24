import { UserController } from '../../src/infra/http/UserController'
import { CreateUserUseCase } from '../../src/application/CreateUserUseCase'

describe('User Controller should', () =>{
    let userController: UserController
    let userCase : CreateUserUseCase

    beforeEach(() =>{
        userController = new UserController(userCase)
    })

    test('', () => {
        
    })
});
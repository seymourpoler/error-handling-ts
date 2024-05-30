import Express from 'express'
import { CreateUserController } from "./http/CreateUserController"
import { CreateUserUseCase } from "../application/User/CreateUserUseCase"
import { FindUserController } from "./http/FindUserController"
import { FindUserUseCase } from "../application/User/FindUserUseCase"
import { UserRepository } from "./database/UserRepository"

const userRepository = new UserRepository()
const findUserUseCase = new FindUserUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)
const findUserController = new FindUserController(findUserUseCase)

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))


app.get('/ping', (req, res) => {
    console.log('ping');
    res.send('pong!')
});

app.get('/status', (req, res) => {
    console.log('status');
    res.send('Hello World!')
});

app.post('/users', (req, res) => {
    console.log('create a user');
    return createUserController.execute(req, res)
})

app.get('/users', (req, res) => {
    console.log('get users');
    return findUserController.execute(req, res)
})

export default app

import Express from 'express'
import { CreateUserController } from "./http/CreateUserController"
import { CreateUserUseCase } from "../application/User/CreateUserUseCase"
import { UserRepository } from "./database/UserRepository"

const userRepository = new UserRepository()
const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

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
    return createUserController.execute(req, res)
})

export default app

import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/register";
import { authenticateUserController } from '../controllers/authenticateUser'
import {profile} from '../controllers/profile'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)
    app.post('/sessions', authenticateUserController)
    app.get('/profile', profile)
}

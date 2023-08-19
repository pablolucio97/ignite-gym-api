import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/register";
import { authenticateUserController } from '../controllers/authenticateUser'

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)
    app.post('/sessions', authenticateUserController)
}

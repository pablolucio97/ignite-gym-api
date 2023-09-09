import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/users/register";
import { authenticateUserController } from '../controllers/users/authenticateUser'
import { profile } from '../controllers/users/profile'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)
    app.post('/sessions', authenticateUserController)
    app.get('/profile', profile)
}

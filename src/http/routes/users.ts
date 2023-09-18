import { FastifyInstance } from 'fastify'
import { registerUserController } from '../controllers/users/register'
import { authenticateUserController } from '../controllers/users/authenticateUser'
import { profile } from '../controllers/users/profile'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)
    //ADD THE verifyJwt MIDDLEWARE TO /sessions ROUTE
    app.post('/sessions', {onRequest: [verifyJwt]}, authenticateUserController)
    app.get('/profile', profile)
}

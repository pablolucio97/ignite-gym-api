import { FastifyInstance } from 'fastify'
import { registerUserController } from '../controllers/users/register'
import { authenticateUserController } from '../controllers/users/authenticateUser'
import { profile } from '../controllers/users/profile'
import { verifyJwt } from '../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerUserController)
    app.post('/sessions', authenticateUserController)
    //ADD THE verifyJwt MIDDLEWARE TO /profile ROUTE
    app.get('/profile',  {onRequest: [verifyJwt]}, profile)
}

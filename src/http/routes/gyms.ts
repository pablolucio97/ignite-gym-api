import { FastifyInstance } from 'fastify'
import { createGymController } from '../controllers/gyms/createGym'
import { searchGymsController } from '../controllers/gyms/searchGyms'
import { getGymsNearByController } from '../controllers/gyms/getGymsNearby'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
    //calls the authentication jwt middleware at request event
    app.addHook('onRequest', verifyJwt)
    app.get('/gyms/search', searchGymsController)
    app.get('/gyms/get-nearby', getGymsNearByController)
    app.post('/gyms/create', createGymController)
}
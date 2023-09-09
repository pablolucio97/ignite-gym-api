import {FastifyInstance} from 'fastify'

import {verifyJwt} from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance){
    //calls the authentication jwt middleware at request event
    app.addHook('onRequest', verifyJwt)
}
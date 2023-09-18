import { FastifyInstance } from 'fastify'
import { RefrehsTokenController } from '../controllers/system/refreshToken'

export async function systemRoutes(app: FastifyInstance) {
    app.patch('/system/refresh-token', RefrehsTokenController)
}
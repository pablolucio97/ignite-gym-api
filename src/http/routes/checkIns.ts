import {FastifyInstance} from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { checkInsHistoryController } from '../controllers/checkIns/checkInsHistory'
import { checkInsMetricsController } from '../controllers/checkIns/checkinsMetrics'
import { validateCheckInController } from '../controllers/checkIns/validateCheckIn'
import { createCheckInController } from '../controllers/checkIns/createCheckIn'

export async function checkInsRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJwt)

    app.get('/check-ins/history', checkInsHistoryController)
    app.get('/check-ins/metrics', checkInsMetricsController)
    app.post('/gyms/:gymId/check-ins', createCheckInController)
    app.patch('/check-ins/:checkInId/validate', validateCheckInController)
}
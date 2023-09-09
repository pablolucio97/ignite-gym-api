import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(req: FastifyRequest, rep: FastifyReply) {
    try {
        await req.jwtVerify()
    } catch (error) {
        return rep.status(400).send({ message: 'Unauthorized' })
    }

}
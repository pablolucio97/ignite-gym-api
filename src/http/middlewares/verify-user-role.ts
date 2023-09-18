import { FastifyRequest, FastifyReply } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'USER') {
    return async (req: FastifyRequest, rep: FastifyReply) => {
        const { role } = req.user
        if (role !== roleToVerify) {
            return rep
                .status(401)
                .send({ message: 'You have no permission to access this resource.' })
        }
    }
}

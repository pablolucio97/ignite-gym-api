import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(req: FastifyRequest, rep: FastifyReply) {
    //RECOVERY DATA PASSED TO JWT TOKEN
    const user = await req.jwtVerify()
    
    return rep.status(200).send({userId: user.sub})
}


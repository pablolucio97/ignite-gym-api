import { registerUserUseCase } from '@/useCases/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'


export async function registerUserController(req: FastifyRequest, rep: FastifyReply) {
    const userRegistrationSchema = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(6)
    })
    const { name, email, password } = userRegistrationSchema.parse(req.body)

        await registerUserUseCase({
            name,
            email,
            password
        })

    return rep.status(201).send()
}
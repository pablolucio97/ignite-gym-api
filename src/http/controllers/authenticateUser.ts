import { AppError } from '@/errors/AppError'
import { makeAuthenticateUserUseCase } from '@/factories/makeAuthenticateUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

const userRegistrationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export async function authenticateUserController(req: FastifyRequest, rep: FastifyReply) {
    const { email, password } = userRegistrationSchema.parse(req.body)
    try {

        const authenticateUserUseCase = makeAuthenticateUserUseCase()

        await authenticateUserUseCase.execute({
            email,
            password
        })

    } catch (error) {
        if(error instanceof AppError) {
            return rep.status(403).send({
                message: error.message
            })
        }
        throw error
    }
    return rep.status(200).send()
}
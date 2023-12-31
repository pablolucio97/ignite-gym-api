import { AppError } from '@/errors/AppError'
import { makeRegisterUserUseCase } from '@/factories/makeRegisterUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

const userRegistrationSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6)
})

export async function registerUserController(req: FastifyRequest, rep: FastifyReply) {
    const { name, email, password } = userRegistrationSchema.parse(req.body)
    try {

        const registerUserUseCase = makeRegisterUserUseCase()
        
        await registerUserUseCase.execute({
            name,
            email,
            password
        })

    } catch (error) {
        if(error instanceof AppError) {
            return rep.status(409).send({
                message: error.message
            })
        }
        throw error
    }
    return rep.status(201).send()
}
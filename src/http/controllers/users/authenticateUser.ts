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

        const user = await authenticateUserUseCase.execute({
            email,
            password
        })

        //CREATING JWT TOKEN BASED ON user.id INFO
        const token = await rep.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return rep.status(200).send({ token })

    } catch (error) {
        if (error instanceof AppError) {
            return rep.status(403).send({
                message: error.message
            })
        }
        throw error
    }
}
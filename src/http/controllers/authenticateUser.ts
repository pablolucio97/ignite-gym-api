import { AppError } from '@/errors/AppError'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { AuthenticateUserUseCase } from '@/useCases/authenticateUser/authenticateUser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

const userRegistrationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

export async function authenticateUserController(req: FastifyRequest, rep: FastifyReply) {
    const { email, password } = userRegistrationSchema.parse(req.body)
    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const authenticateUserUseCase = new AuthenticateUserUseCase(prismaUsersRepository)

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
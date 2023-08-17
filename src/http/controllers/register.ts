import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { RegisterUseCase } from '@/useCases/register'
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

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUserUseCase = new RegisterUseCase(prismaUsersRepository)

        await registerUserUseCase.execute({
            name,
            email,
            password
        })

    } catch (error) {
        console.log(error)
        return rep.status(409).send()
    }
    return rep.status(201).send()
}
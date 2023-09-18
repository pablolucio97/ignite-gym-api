import { AppError } from '@/errors/AppError'
import { makeAuthenticateUserUseCase } from '@/factories/makeAuthenticateUserUseCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z as zod } from 'zod'

const userRegistrationSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})

export async function authenticateUserController(
    req: FastifyRequest,
    rep: FastifyReply
) {
    const { email, password } = userRegistrationSchema.parse(req.body)
    try {
        const authenticateUserUseCase = makeAuthenticateUserUseCase()

        const user = await authenticateUserUseCase.execute({
            email,
            password,
        })
        //CREATING JWT TOKEN BASED ON user.id INFO
        const token = await rep.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                },
            }
        )

        const refreshToken = await rep.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d',
                },
            }
        )

        return rep
            .setCookie('refreshToken', refreshToken, {
                path: '/', // ROUTES HAS ACCESS TO READ THE COOKIE
                secure: true, // COOKIE IS ENCRYPTED BY HTTPS, FRONT-END CAN READ IT
                sameSite: true, //AVAILABLE ONLY IN THE DOMAIN (LOCALHOST OR PRODURL)
                httpOnly: true, //AVAILABLE OLY IN THE REQUEST CONTEXT, NOT WILL BE STORED IN BROWSER
            })
            .status(200)
            .send({ token })
    } catch (error) {
        if (error instanceof AppError) {
            return rep.status(403).send({
                message: error.message,
            })
        }
        throw error
    }
}

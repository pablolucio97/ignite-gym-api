import { AppError } from '@/errors/AppError'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function RefrehsTokenController(
    req: FastifyRequest,
    rep: FastifyReply
) {
    //VALIDATE IF USER IS AUTHENTICATED SEARCHING FOR THE EXISTING COOKIE AND NOT BEARER TOKEN
    await req.jwtVerify({ onlyCookie: true })
    //IF THERE IS A VALID COOKIE, FOLLOWS THE NEXT CODE
    try {
    //CREATING JWT TOKEN BASED ON req.user.sub INFO
        const token = await rep.jwtSign(
            {},
            {
                sign: {
                    sub: req.user.sub,
                },
            }
        )

        const refreshToken = await rep.jwtSign(
            {},
            {
                sign: {
                    sub: req.user.sub,
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

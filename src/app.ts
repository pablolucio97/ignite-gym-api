import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from '@/env'
import { usersRoutes } from './http/routes/users'
import { gymsRoutes } from './http/routes/gyms'
import fastifyCookie from '@fastify/cookie'
import { checkInsRoutes } from './http/routes/checkIns'
import { systemRoutes } from './http/routes/system'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie:{
        cookieName: 'refreshToken',
        signed: false,
    },
    sign:{
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(systemRoutes)

app.setErrorHandler((error, _, rep) => {
    if (error instanceof ZodError) {
        return rep
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    }else{
        //SEND TO AN EXTERNAL SERVICE LOG ERROR, LIKE SENTRY OR DATADOG
    }

    return rep
        .status(500)
        .send({message: 'Internal server error'})
})
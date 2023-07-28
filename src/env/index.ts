import 'dotenv/config'
import {z as zod} from 'zod'

const envSchema = zod.object({
    NODE_ENV: zod.enum(['dev', 'test', 'production']).default('dev'),
    PORT: zod.coerce.number()
})

//VALIDATES IF THE ENV VAR MATCHES THE OBJECT VALIDATION
const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Invalid environment variables', _env.error.format())

    //STOP ALL APPLICATION IF ENV VARS SETUP IS WRONG
    throw new Error('Invalid environment variables')
}

//EXPORTS THE ENV VARS OBJECT VALIDATED
export const env = _env.data
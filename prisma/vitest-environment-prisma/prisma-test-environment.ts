import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable')
    }
    //READ THE process.env.DATABASE_URL
    const url = new URL(process.env.DATABASE_URL)
    //REPLACE THE SEARCH PARAMS FORM THE URL FOR THE NEW RAMDOMUUID (REPLACE "public"  TO THE RANDOM UUID)
    url.searchParams.set('schema', schema)
    return url.toString()
}

export default <Environment>(<unknown>{
    name: 'prisma',
    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDatabaseUrl(schema)
        process.env.DATABASE_URL = databaseUrl
        //EXECUTE LIKE ON TERMINAL, ALL PRISMA MIGRATIONS WITHOUT COMPARING WITH YOUR LOCAL MIGRATIONS
        execSync('npx yarn prisma migrate deploy')
        return {
            async teardown() {
                //DELETE THE SCHEMA AND DISCONNECT FROM DATABASE AFTER EXECUTING THE E2E TESTS
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
                )
                await prisma.$disconnect()
            },
        }
    },
})

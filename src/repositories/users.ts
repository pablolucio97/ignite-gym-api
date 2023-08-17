import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
    //THE INTERFACE UserCreateInput WAS AUTOMATICALLY CREATED BY PRISMA AT RUNNING RUNNING MIGRATION SCHEMA
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }
}
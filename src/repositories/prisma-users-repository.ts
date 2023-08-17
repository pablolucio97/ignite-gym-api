import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from './interfaces/prisma-users-repository'
import { GetResult } from '@prisma/client/runtime/library'

export class PrismaUsersRepository implements UsersRepository {

    //THE INTERFACE UserCreateInput WAS AUTOMATICALLY CREATED BY PRISMA AT RUNNING RUNNING MIGRATION SCHEMA
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }
}
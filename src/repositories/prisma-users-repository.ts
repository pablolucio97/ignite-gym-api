import { prisma } from '@/services/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from './interfaces/prisma-users-repository'

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

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }
}
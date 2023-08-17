import { prisma } from '@/services/prisma';
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/users';

interface IRegisterUserDTO {
    name: string;
    email: string;
    password: string;
}

export async function registerUserUseCase({
    name,
    email,
    password
}: IRegisterUserDTO) {
    
    const userAlreadyExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userAlreadyExists) {
        throw new Error('E-mail already exists')
    }

    const hashedPassword = await hash(password, 6)

    const prismaUsersRepository = new PrismaUsersRepository()

    await prismaUsersRepository.create({
        name,
        email,
        password_hash: hashedPassword
    })

}

import { AppError } from '@/errors/AppError';
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}


export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: PrismaUsersRepository
    ) { }

    async execute({ email, password }: IAuthenticateUserRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Invalid credentials.')
        }

        const doesPasswordMatches = await compare(user.password_hash, password)

        if (!doesPasswordMatches) {
            throw new AppError("Invalid Credentials.")
        }

        return user
    }
}
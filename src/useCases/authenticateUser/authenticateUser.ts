import { AppError } from '@/errors/AppError';
import { UsersRepository } from '@/repositories/interfaces/prisma-users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface IAuthenticateUserRequest {
    email: string;
    password: string;
}


export class AuthenticateUserUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute({ email, password }: IAuthenticateUserRequest): Promise<User> {
        const user = await this.usersRepository.findByEmail(email)

        
        if (!user) {
            throw new AppError('Invalid credentials.')
        }
        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new AppError("Invalid Credentials.")
        }

        return user
    }
}
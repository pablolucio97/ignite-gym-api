import { AppError } from '@/errors/AppError';
import { UsersRepository } from '@/repositories/interfaces/prisma-users-repository';
import { hash } from 'bcryptjs';

interface IRegisterUserDTO {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }
    async execute({
        name,
        email,
        password
    }: IRegisterUserDTO) {

        const hashedPassword = await hash(password, 6)

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new AppError('E-mail already exists')
        }

        const newUser = await this.usersRepository.create({
            name,
            email,
            password_hash: hashedPassword
        })

        return {
            newUser
        }

    }
}

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
            throw new Error('E-mail already exists')
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash: hashedPassword
        })

    }
}

export async function registerUserUseCase({
    name,
    email,
    password
}: IRegisterUserDTO) {


}

import { PrismaUsersRepository } from '@/repositories/prisma-users-repository';
import { RegisterUseCase } from '@/useCases/registerUser/registerUser';

export function makeRegisterUserUseCase(){
   const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    return registerUseCase
}
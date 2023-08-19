import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"
import { AuthenticateUserUseCase } from "@/useCases/authenticateUser/authenticateUser"

export function makeAuthenticateUserUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    return authenticateUserUseCase
}
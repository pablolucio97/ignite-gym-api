import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../useCases/getUser/getUserUseCase'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserUseCase(usersRepository)

  return useCase
}
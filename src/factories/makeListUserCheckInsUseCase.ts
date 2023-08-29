import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { ListCheckInsByUserUseCase } from '../useCases/listCheckInsByUser/listCheckInsByUserUseCase'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ListCheckInsByUserUseCase(checkInsRepository)

  return useCase
}
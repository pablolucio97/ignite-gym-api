import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { CountCheckInsByUserUseCase } from '../useCases/countCheckInsByUser/countCheckInsByUserUseCase'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new CountCheckInsByUserUseCase(checkInsRepository)

  return useCase
}
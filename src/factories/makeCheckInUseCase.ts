import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckinUserUseCase } from '../useCases/checkinUser/checkinUser'

export function makeCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()

    const useCase = new CheckinUserUseCase(checkInsRepository, gymsRepository)

    return useCase
}
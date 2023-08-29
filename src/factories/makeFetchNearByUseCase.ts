import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsUseCase } from '../useCases/searchNearByGyms/searchNearByGymsUseCase'

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)

    return useCase
}
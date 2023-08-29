import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "@/useCases/searchGyms/searchGymUseCase";

export function makeSearchGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository
    const useCase = new SearchGymsUseCase(gymsRepository)
    return useCase
}
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { ValidateCheckInUseCase } from '../useCases/validateCheckIn/validateCheckInUseCase'

export function makeValidateCheckInUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(checkInsRepository)
    return useCase
}
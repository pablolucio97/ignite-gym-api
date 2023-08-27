import { CheckInsRepository } from '../../repositories/interfaces/prisma-checkins-repository'

interface CountCheckInsByUserUseCaseRequest {
  userId: string
}

interface CountCheckInsByUserUseCaseResponse {
  checkInsCount: number
}

export class CountCheckInsByUserUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: CountCheckInsByUserUseCaseRequest): Promise<CountCheckInsByUserUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}

import { CheckInsRepository } from '../../repositories/interfaces/prisma-checkins-repository'

interface ListCheckInsByUserUseCaseRequest {
    userId: string
    page: number
}

export class ListCheckInsByUserUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, page }: ListCheckInsByUserUseCaseRequest) {
        const checkIns = await this.checkInsRepository.listPaginatedCheckinsByUser(userId, page)
        return checkIns
    }

}
import { CheckInsRepository } from '../../repositories/interfaces/prisma-checkins-repository'
import { Checkin } from '@prisma/client'

interface ListCheckInsByUserUseCaseRequest {
    userId: string
    page: number
}
interface FetchUserCheckInsHistoryUseCaseResponse {
    checkIns: Checkin[]
  }
  

export class ListCheckInsByUserUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, page }: ListCheckInsByUserUseCaseRequest) : Promise<FetchUserCheckInsHistoryUseCaseResponse> {
        const checkIns = await this.checkInsRepository.listPaginatedCheckinsByUser(userId, page)
        return {
            checkIns
        }
    }

}
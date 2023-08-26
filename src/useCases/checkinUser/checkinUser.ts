import { AppError } from '@/errors/AppError';
import { CheckInsRepository } from '@/repositories/interfaces/prisma-checkins-repository';
import { Checkin } from '@prisma/client';

interface ICheckinUserRequest {
    userId: string;
    gymId: string;
}

interface ICheckinResponse {
    checkIn: Checkin
}

export class CheckinUserUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository
    ) { }

    async execute({ userId, gymId }: ICheckinUserRequest): Promise<ICheckinResponse> {
        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date(),
        )

        if (checkInOnSameDay) {
            throw new AppError('Você já realizou check in hoje.')
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}
import { AppError } from '@/errors/AppError';
import { CheckInsRepository } from '@/repositories/interfaces/prisma-checkins-repository';
import { UsersRepository } from '@/repositories/interfaces/prisma-users-repository';
import { Checkin, User } from '@prisma/client';
import { compare } from 'bcryptjs';

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
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}
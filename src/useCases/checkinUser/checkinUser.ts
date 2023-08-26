import { AppError } from '@/errors/AppError';
import { CheckInsRepository } from '@/repositories/interfaces/prisma-checkins-repository';
import { GymsRepository } from '@/repositories/interfaces/prisma-gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/getDistanceBetweenTwoCordinates';
import { Checkin } from '@prisma/client';

interface ICheckinUserRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface ICheckinResponse {
    checkIn: Checkin
}

export class CheckinUserUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) { }

    async execute({ userId, gymId, userLatitude, userLongitude }: ICheckinUserRequest): Promise<ICheckinResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new AppError('Academia não encontrada')
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber()
            }
        );

        const MAX_DISTANCE_ALLOWED_IN_KM = 0.1

        if (distance > MAX_DISTANCE_ALLOWED_IN_KM) {
            throw new AppError('Academia fora do raio de distancia permitido.')
        }

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
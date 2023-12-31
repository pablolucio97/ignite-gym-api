import dayjs from 'dayjs';
import { AppError } from '@/errors/AppError'
import { CheckInsRepository } from '@/repositories/interfaces/prisma-checkins-repository'

import { Checkin } from '@prisma/client'

interface ValidateCheckInUseCaseRequest {
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: Checkin
}

export class ValidateCheckInUseCase {
    constructor(private checkInsRepository: CheckInsRepository) { }

    async execute({
        checkInId,
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new AppError('CheckIn não encontrado.')
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )

        if (distanceInMinutesFromCheckInCreation > 20) {
            throw new AppError('CheckIn não pode ser validado após 20 minutos.')
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn,
        }
    }
}
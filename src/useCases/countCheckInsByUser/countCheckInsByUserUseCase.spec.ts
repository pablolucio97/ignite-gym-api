import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '../../repositories/in-memory/in-memory-checkins-repository'
import { CountCheckInsByUserUseCase } from './countCheckInsByUserUseCase'

let checkInsRepository: InMemoryCheckInsRepository
let countCheckInsByUserUseCase: CountCheckInsByUserUseCase

describe('Count check-ins by user use case',  () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        countCheckInsByUserUseCase = new CountCheckInsByUserUseCase(checkInsRepository)
    })

    it('should be able to get check-ins count from metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const { checkInsCount } = await countCheckInsByUserUseCase.execute({
            userId: 'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })
})
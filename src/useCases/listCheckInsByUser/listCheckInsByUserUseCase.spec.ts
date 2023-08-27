import { describe, it, beforeEach, expect } from 'vitest'

import { InMemoryCheckInsRepository } from '../../repositories/in-memory/in-memory-checkins-repository'
import { ListCheckInsByUserUseCase } from './listCheckInsByUserUseCase'

let checkInsRepository: InMemoryCheckInsRepository
let listChecksByUserUseCase: ListCheckInsByUserUseCase

describe('List check-ins by user use case', async () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        listChecksByUserUseCase = new ListCheckInsByUserUseCase(checkInsRepository)
    })

    it('should be able to list user checkins', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        })

        const checkIns = await listChecksByUserUseCase.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' }),
          ])

    })
})
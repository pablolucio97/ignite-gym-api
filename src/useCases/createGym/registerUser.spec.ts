import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './createGym'

describe('Create Gym UseCase', () => {

    let gymsRepository: InMemoryGymsRepository
    let createGymUseCase: CreateGymUseCase

    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        createGymUseCase = new CreateGymUseCase(gymsRepository)
    })

    it('should be able to create a new gym', async () => {
        const { gym } = await createGymUseCase.execute({
            title: "Academia do TypeScript",
            description: "Typing languages",
            latitude: 2394823,
            longitude: 3948193,
            phone: "3199999999"
        })
        expect(gym.id).toEqual(expect.any(String))
    })

})
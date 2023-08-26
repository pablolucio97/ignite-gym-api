import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { CheckinUserUseCase } from './checkinUser'
import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUserUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUserUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.8340334),
      longitude: new Decimal(-43.1650275275),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8340334,
      userLongitude: -43.1650275275
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8340334,
      userLongitude: -43.1650275275
    })

    expect(async () =>
      await sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.8340334,
        userLongitude: -43.1650275275
      }),
    ).rejects.toBeInstanceOf(Error)

  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8340334,
      userLongitude: -43.1650275275
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.8340334,
      userLongitude: -43.1650275275
    })


    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on gyms over 100 meter of distance', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.7527358),
      longitude: new Decimal(-43.0159558),
    })

    expect(async () => {
      await sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -19.8340334,
        userLongitude: -43.1650275275
      })
    }).rejects.toBeInstanceOf(Error)

  })

})

//

import { Gym, Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { FindManyNearbyParams, GymsRepository } from "../interfaces/prisma-gyms-repository"
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenTwoCordinates"

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(gymData: Prisma.GymCreateInput) {
    const gym = {
      id: gymData.id ?? randomUUID(),
      title: gymData.title,
      description: gymData.description ?? null,
      phone: gymData.phone ?? null,
      latitude: new Prisma.Decimal(gymData.latitude.toString()),
      longitude: new Prisma.Decimal(gymData.longitude.toString()),
      created_at: new Date()
    }
    this.items.push(gym)
    return gym
  }


  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  async searchMany(searchTerm: string, page: number) {
    return this.items
      .filter(item => item.title.toLowerCase() === searchTerm.toLowerCase())
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}

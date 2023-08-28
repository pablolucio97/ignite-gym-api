import { Checkin, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { CheckInsRepository } from "../interfaces/prisma-checkins-repository"
import dayjs from "dayjs"


export class InMemoryCheckInsRepository implements CheckInsRepository {

    public items: Checkin[] = []

    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const CheckIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null
        }

        this.items.push(CheckIn)

        return CheckIn
    }

    async findByUserIdOnDate(userId: string, date: Date) {


        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')


        const checkInOnSameDate = this.items.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at)
            const isOnSameDate =
                checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async listPaginatedCheckinsByUser(userId: string, page: number) {
        const checkins = this.items.filter(checkin => checkin.id === userId)
            .slice((page - 1) * 20, page * 20)
        return checkins
    }

    async countByUserId(userId: string) {
        return this.items.filter((checkIn) => checkIn.user_id === userId).length
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async save(checkIn: Checkin) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    
        if (checkInIndex >= 0) {
          this.items[checkInIndex] = checkIn
        }
    
        return checkIn
      }

}

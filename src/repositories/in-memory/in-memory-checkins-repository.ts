import { Checkin, Prisma } from "@prisma/client"
import { randomUUID } from "node:crypto"
import { CheckInsRepository } from "../interfaces/prisma-checkins-repository"

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
}

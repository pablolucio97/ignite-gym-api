import { GymsRepository } from '@/repositories/interfaces/prisma-gyms-repository';

interface ICreateGymDTO {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

export class CreateGymUseCase {
    constructor(
        private gymsRepository: GymsRepository
    ) { }
    async execute({
        title,
        description,
        phone,
        latitude,
        longitude
    }: ICreateGymDTO) {

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
        })

        return {
            gym
        }

    }
}
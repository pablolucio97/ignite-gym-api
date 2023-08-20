import { AppError } from "@/errors/AppError";
import { UsersRepository } from "@/repositories/interfaces/prisma-users-repository";

export class GetUserUseCase {
    constructor(
        private users: UsersRepository
    ) { }

    async execute(userId: string) {
        const user = await this.users.findById(userId);

        if (!userId) {
            throw new AppError('Id is required')
        }

        if (!user) {
            throw new AppError('User does not exist')
        }

        return user

    }

}
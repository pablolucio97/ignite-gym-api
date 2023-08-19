import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './registerUser'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'

describe('Register Use Case', () => {
    it('should hash user password correctly on registration', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { newUser } = await registerUseCase.execute({
            email: 'johndoe2@gmail.com',
            name: 'johndoe',
            password: 'abc123'
        })

        const isPassCorrectlyHashed = await compare(
            'abc123',
            newUser.password_hash
        )
        expect(isPassCorrectlyHashed).toBe(true)
    })

    it('should not be able to register two users with same email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johndoe-test@gmail.com'

        await registerUseCase.execute({
            email,
            name: 'johndoe',
            password: 'abc123'
        })

        expect(async () => {
            return await registerUseCase.execute({
                email,
                name: 'johndoe',
                password: 'abc123'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to register an user', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { newUser } = await registerUseCase.execute({
            email: 'johndoe2@gmail.com',
            name: 'johndoe',
            password: 'abc123'
        })

        expect(newUser.id).toEqual(expect.any(String))
    })

})
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './registerUser'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/errors/AppError'

describe('Register Use Case', () => {

    let usersRepository: InMemoryUsersRepository
    let registerUseCase: RegisterUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should hash user password correctly on registration', async () => {
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
        const { newUser } = await registerUseCase.execute({
            email: 'johndoe2@gmail.com',
            name: 'johndoe',
            password: 'abc123'
        })
        expect(newUser.id).toEqual(expect.any(String))
    })

})
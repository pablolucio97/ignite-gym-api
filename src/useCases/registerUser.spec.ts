import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './registerUser'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

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
})
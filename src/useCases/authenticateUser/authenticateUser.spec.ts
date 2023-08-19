import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { expect, it, test } from 'vitest';
import { AuthenticateUserUseCase } from './authenticateUser';
import { AppError } from '@/errors/AppError';

test('AuthenticateUserUseCase', () => {
    it('should be able to authenticate user', async () => {

        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)

        const user = await inMemoryUsersRepository.create({
            name: 'john',
            email: 'john@example.com',
            password_hash: await hash('123456', 6),
            checkin_id: '',
            checkins: undefined,
            created_at: new Date(),
        })

        const { name } = await authenticateUserUseCase.execute({
            email: user.email,
            password: '123456'
        })

        expect(name).toBe('john-wrong')

    })

    
    it('should not be able to authenticate with wrong email', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)

        const email = 'johndoe-testr2@gmail.com'

        expect(async () => {
            return await authenticateUserUseCase.execute({
                email,
                password: 'abc123'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)

        const email = 'johndoe-testr2@gmail.com'

        expect(async () => {
            return await authenticateUserUseCase.execute({
                email,
                password: 'anypassword'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
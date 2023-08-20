import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { beforeEach, expect, it, test } from 'vitest';
import { AuthenticateUserUseCase } from './authenticateUser';
import { AppError } from '@/errors/AppError';

test('AuthenticateUserUseCase', () => {

    let inMemoryUsersRepository: InMemoryUsersRepository
    let authenticateUserUseCase: AuthenticateUserUseCase

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
    })

    it('should be able to authenticate user', async () => {
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
        expect(name).toEqual('john-wrong')
    })


    it('should not be able to authenticate with wrong email', async () => {
        const email = 'johndoe-testr2@gmail.com'
        expect(async () => {
            return await authenticateUserUseCase.execute({
                email,
                password: 'abc123'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const email = 'johndoe-testr2@gmail.com'
        expect(async () => {
            return await authenticateUserUseCase.execute({
                email,
                password: 'anypassword'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
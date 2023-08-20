import { it, test, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserUseCase } from './getUserUseCase'
import { hash } from 'bcryptjs'
import { AppError } from '@/errors/AppError'

test('Get user use case', () => {

    let usersRepository: InMemoryUsersRepository
    let getUserUseCase: GetUserUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        getUserUseCase = new GetUserUseCase(usersRepository)
    })

    it('Should return an user by its id', async () => {
        const newUser = await usersRepository.create({
            name: 'johndoe',
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6)
        })
        const user = await getUserUseCase.execute(newUser.id)
        expect(user.name).toEqual('johndoe')
    })

    it('Should not be able to get an user with wrong id', async () => {
        expect(() => {
            getUserUseCase.execute('any-non-existing-id')
        }).rejects.toBeInstanceOf(AppError)
    })
})
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate1', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate user', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@outlook.com',
            password: '1234567',
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'johndoe@outlook.com',
            password: '1234567',
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})

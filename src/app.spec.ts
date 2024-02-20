import supertest from 'supertest'
import { App } from './app'
import { testGetRoute, testPostRoute } from './routes-test/default-route'

describe('Test Fastify Application', () => {
    const app = new App()

    beforeEach(async () => {
        await app.fastify.ready()
    })

    afterEach(async () => {
        await app.fastify.close()
    })

    it('Should test the GET route', async () => {
        app.fastify.register(testGetRoute)
        const response = await supertest(app.fastify.server).get('/')

        expect(response.body).toEqual({ message: 'Hello World!' })

    })

    it('Should test the POST route', async () => {
        app.fastify.register(testPostRoute)
        const response = await supertest(app.fastify.server).post('/').send({
            username: 'TESTE',
            password: 'TESTE'
        })

        expect(response.body).toEqual({ message: 'Hello World!' })

    })
})
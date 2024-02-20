import { FastifyInstance } from 'fastify'
import { z } from 'zod'

type ExemploPOSTRoute = {
    username: string,
    password: string
}

export async function testGetRoute(app: FastifyInstance) {
    app.get('/', (request, reply) => {
        reply.send({ message: 'Hello World!' })
    })
}

export async function testPostRoute(app: FastifyInstance) {
    app.post('/', (request, reply) => {
        const testPostParams = z.object({
            username: z.string(),
            password: z.string(),
        })

        const { username, password } = testPostParams.parse(request.body)
        let user: ExemploPOSTRoute[] = []

        const data = {
            username,
            password
        }


        user.push(data)

        reply.status(201).send({})
    })
}
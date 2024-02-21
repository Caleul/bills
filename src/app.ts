import fastify, { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'

export class App {
    fastify: FastifyInstance

    constructor() {
        this.fastify = fastify({ logger: true })
    }

    public start(port: number) {
        this.fastify.listen({ port }, (error, adress) => {
            if (error) {
                console.error(error)
                process.exit(1)
            }

            console.log(`Server running on port ${port} at adress ${adress}`)
        })
    }
}

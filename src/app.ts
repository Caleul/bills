import fastify, { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'

export class App {
    fastify: FastifyInstance

    constructor() {
        this.fastify = fastify({ logger: true })

        /*
        this.fastify.register(swagger, {
            swagger: {
                info: {
                  title: 'Test swagger',
                  description: 'Testing the Fastify swagger API',
                  version: '0.1.0'
                },
                externalDocs: {
                  url: 'https://swagger.io',
                  description: 'Find more info here'
                },
                host: 'localhost',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
                tags: [
                  { name: 'user', description: 'User related end-points' },
                  { name: 'code', description: 'Code related end-points' }
                ],
                definitions: {
                  User: {
                    type: 'object',
                    required: ['id', 'email'],
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      firstName: { type: 'string' },
                      lastName: { type: 'string' },
                      email: {type: 'string', format: 'email' }
                    }
                  }
                },
                securityDefinitions: {
                  apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                  }
                }
              }
        })
        */
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



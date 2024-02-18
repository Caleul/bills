import fastify from 'fastify'
import cookie, { FastifyCookieOptions } from '@fastify/cookie'
import dotenv from 'dotenv'
import { getBill } from './routes/get-bill'

dotenv.config()

const app = fastify()

app.register(cookie, {
    secret: process.env.SECRET,
    hook: 'onRequest',
} as FastifyCookieOptions)

app.register(getBill)

app.listen({ port: Number(process.env.PORT) }).then(() => {
    console.log(`HTTP server running on port ${process.env.PORT}`)
})
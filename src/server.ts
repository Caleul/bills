import { App } from './app'
import dotenv from 'dotenv'
import { getBill } from './routes/get-bill'

dotenv.config()

const app = new App()

app.fastify.register(getBill)

app.start(Number(process.env.PORT))
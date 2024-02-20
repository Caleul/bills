import { redis } from './redis'

export async function storeTokenRedis(token: string, expires_in: string) {
    const now = new Date()
    const expires = new Date(expires_in)
    const ttl = Math.round((expires.getTime() - now.getTime()) / 1000)

    await redis.set('token', token, 'EX', ttl)
}

export async function getTokenRedis(): Promise<string | false> {
    const token = await redis.get('token')
    if (token === null) {
        return false
    }

    const ttl = await redis.ttl('token')
    if (ttl <= 0) {
        await redis.del('token')
        return false
    }

    return token
}


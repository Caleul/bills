import { z } from 'zod'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { getToken } from '../api/get-token'
import { getBillInfo } from '../api/bill-info'
import { calculateInterest } from '../math/interest'
import { calculateFine } from '../math/fine'
import { prisma } from '../lib/prisma'
import { getTokenRedis, storeTokenRedis } from '../lib/token'

export async function getBill(app: FastifyInstance){
    app.post('/bill', async(request: FastifyRequest, reply: FastifyReply) => {
        const getBillParams = z.object({
            bar_code: z.string(),
            payment_date: z.string(),
        })

        const { body } = request
        const allowedParams = ['bar_code', 'payment_date']

        for (const params in body) {
            if (!allowedParams.includes(params)) { 
                return reply.status(422).send({ 
                    message: 'Invalid parameter(s) sent',
                })
            }
        }

        const { bar_code, payment_date } = getBillParams.parse(request.body)

        if (new Date(payment_date).toString() === 'Invalid Date') {
            return reply.status(400).send({ 
                message: 'Invalid date',
            })
        }

        let token = await getTokenRedis()

        if (!token) {
            let expires_in
            ({ token, expires_in } = await getToken())

            storeTokenRedis(token, expires_in)
            console.log('Token generated')
        }

        const parts = token.split('.')

        const { due_date, amount, type } = await getBillInfo(bar_code, parts[0])

        if (!(amount || due_date || type)) {
            return reply.status(400).send({ 
                message: 'Invalid barrcode',
            })
        }

        const interest = calculateInterest(amount, dateDifferenceInDays(due_date, payment_date))
        const fine = calculateFine(amount)

        // Database is also used by the data analysts team 
        // Then I decided to store data that will not be returned to the user
        // This way, they will have access to broader data

        await prisma.performedCalculation.create({
            data: {
                barCode: bar_code,
                paymentDate: new Date(payment_date),
                originalAmount: Number(amount),
                amount: Number(amount) + interest + fine,
                dueDate: new Date(due_date),
                interest,
                fine,
                type,
            }
        })
        
        if (type != 'NPC') {
            return reply.status(422).send({ 
                message: 'Only NPC type bills will be calculated',
                type
            })
        }

        if (new Date(due_date) >= new Date(payment_date)) {
            return reply.status(422).send({ 
                message: 'This bill is not expired',
                due_date
            })
        }

        return reply.send({
            "original_amount": Number(amount),
            "amount": Number(amount) + interest + fine,
            "due_date": due_date,
            "payment_date": payment_date,
            "interest_amount_calculated": interest,
            "fine_amount_calculated": fine
        }).status(200)
    })
}

function dateDifferenceInDays(startDate: string, endDate: string): number {

    const start = new Date(startDate)
    const end = new Date(endDate)
    let diffInMs = end.getTime() - start.getTime()

    if (diffInMs < 0) {
        diffInMs = 0
    }

    return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}
  

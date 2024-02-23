import { z } from 'zod'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { getToken } from '../api/get-token'
import { getBillInfo } from '../api/bill-info'
import { calculateInterest } from '../math/interest'
import { calculateFine } from '../math/fine'
import { prisma } from '../lib/prisma'
import { getTokenRedis, storeTokenRedis } from '../lib/token'
import { dateDifferenceInDays } from '../math/dateDifference'

export async function getBill(app: FastifyInstance){
    app.post('/bill', async(request: FastifyRequest, reply: FastifyReply) => {
        try {
            const getBillParams = z.object({
                bar_code: z.string(),
                payment_date: z.string(),
            })

            const { body } = request
            const allowedParams = ['bar_code', 'payment_date']

            for (const params in body) {
                if (!allowedParams.includes(params)) { 
                    return reply.status(422).send({
                        errors: [
                            { message: 'Invalid parameter(s) sent' }
                        ]
                    })
                }
            }

            const { bar_code, payment_date } = getBillParams.parse(request.body)

            if (new Date(payment_date).toString() === 'Invalid Date') {
                return reply.status(400).send({
                    errors: [
                        { message: 'Invalid date' }
                    ]
                })
            }

            let token = await getTokenRedis()

            if (!token) {
                let expires_in
                ({ token, expires_in } = await getToken())

                storeTokenRedis(token, expires_in)
            }

            const parts = token.split('.')

            const { due_date, amount, type } = await getBillInfo(bar_code, parts[0])

            if (!(amount || due_date || type)) {
                return reply.status(400).send({
                    errors: [
                        { message: 'Invalid barrcode' }
                    ]
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
                    errors: [
                        {
                            message: 'Only NPC type bills will be calculated',
                            type
                        }
                    ]
                })
            }

            if (new Date(due_date) >= new Date(payment_date)) {
                return reply.status(422).send({
                    errors: [
                        {
                            message: 'This bill is not expired',
                            due_date
                        }
                    ]
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

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.errors.map((error) => { message: error } )

                return reply.status(422).send({ errors })
            } else {
                return reply.status(422).send({ error: 'Unexpected error' })
            }
        }
    })
}

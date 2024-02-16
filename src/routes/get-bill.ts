import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { getToken } from '../api/get-token'
import { getBillInfo } from '../api/bill-info'
import { calculateInterest } from '../math/interest'
import { calculateFine } from '../math/fine'
import { prisma } from '../lib/prisma'

export async function getBill(app: FastifyInstance){
    app.post('/bill', async(request, reply) => {
        const getBillParams = z.object({
            bar_code: z.string(),
            payment_date: z.string(),
        })

        const { bar_code, payment_date } = getBillParams.parse(request.body)

        let { token } = request.cookies

        if (!token) {
            let expires_in
            ({ token, expires_in } = await getToken())

            const now = new Date()
            const expires = new Date(expires_in)
            const maxAge = Math.round((expires.getTime() - now.getTime()) / 1000)

            reply.setCookie('token', token, {
                path: '/',
                maxAge: maxAge,
                signed: true,
                httpOnly: true,
            })
        }

        const parts = token.split('.')

        const { due_date, amount, type } = await getBillInfo(bar_code, parts[0])        

        const interest = calculateInterest(amount, dateDifferenceInDays(due_date, payment_date))
        const fine = calculateFine(amount)

        // Database is also used by the data analysts team 
        // Then I decided to store data that will not be returned to the user
        // This way, they will have access to broader data

        await prisma.performedCalculation.create({
            data: {
                barCode: bar_code,
                paymentDate: payment_date,
                originalAmount: amount,
                amount: amount + interest + fine,
                dueDate: due_date,
                interest,
                fine,
                type,
            }
        })
        
        if (type != 'NPC') {
            return reply.send({ 
                message: 'Only NPC type bills will be calculated',
                type
            })
        }

        if (new Date(due_date) >= new Date(payment_date)) {
            return reply.send({ 
                message: 'This bill is not expired',
                due_date
            })
        }

        return reply.send({
            "original_amount": amount,
            "amount": amount + interest + fine,
            "due_date": due_date,
            "payment_date": payment_date,
            "interest_amount_calculated": interest,
            "fine_amount_calculated": fine
        })
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
  
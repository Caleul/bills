import axios from 'axios'

describe("Bills API", () => {
    it("Should efective receive a bill info", async () => {
        const response = await axios.post(
            'http://localhost:3000/bill',
            {
                "bar_code": "34199800020104352008771020110004191070010000",
                "payment_date": "2024-05-15"
            }
        )

        expect(response.status).toBe(200)
        expect(response.data).toHaveProperty("original_amount")
        expect(response.data).toHaveProperty("amount")
        expect(response.data).toHaveProperty("due_date")
        expect(response.data).toHaveProperty("payment_date")
        expect(response.data).toHaveProperty("interest_amount_calculated")
        expect(response.data).toHaveProperty("fine_amount_calculated")
    })

    it("Should return an invalid barrcode error", async () => {
        const response = await axios.post(
            'http://localhost:3000/bill',
            {
                "bar_code": "1122",
                "payment_date": "2024-05-15"
            }
        )
        expect(response.status).toBe(400)
        expect(response.data).toHaveProperty("message")
        expect(response.data.message).toBe("Invalid barrcode")
    })

    it("Should return an invalid date error", async () => {
        const response = await axios.post(
            'http://localhost:3000/bill',
            {
                "bar_code": "34199800020104352008771020110004191070010000",
                "payment_date": "2024-40-40"
            }
        )
        expect(response.status).toBe(400)
        expect(response.data).toHaveProperty("message")
        expect(response.data.message).toBe("Invalid date")
    })

    it("Should return an invalid type message", async () => {
        const response = await axios.post(
            'http://localhost:3000/bill',
            {
                "bar_code": "34197650070104357008271020110004991070040000",
                "payment_date": "2024-01-01"
            }
        )
        expect(response.status).toBe(422)
        expect(response.data).toHaveProperty("message")
        expect(response.data.message).toBe("Only NPC type bills will be calculated")
        expect(response.data).toHaveProperty("type")        
    })

    it("Should return an invalid type message", async () => {
        const response = await axios.post(
            'http://localhost:3000/bill',
            {
                "bar_code": "34191790010104351004791020150008291070026000",
                "payment_date": "2020-01-01"
            }
        )
        expect(response.status).toBe(422)
        expect(response.data).toHaveProperty("message")
        expect(response.data.message).toBe("This bill is not expired")
        expect(response.data).toHaveProperty("due_date")
    })
})

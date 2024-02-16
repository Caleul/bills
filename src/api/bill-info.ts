import https from 'node:https'
import dotenv from 'dotenv'

export async function getBillInfo(billCode: string, token: string): Promise<{
    code: string,
    due_date: string,
    amount: number,
    recipient_name: string,
    recipient_document: string,
    type: string
}> {
    dotenv.config()
    
    return new Promise(async (resolve, reject) => {
        const postData = JSON.stringify({
            'code': billCode,
        })
        
        const options = {
            hostname: process.env.BILLINFO_HOSTNAME,
            port: 443,
            path: process.env.BILLINFO_PATH,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
                'Content-Length': postData.length
            }
        }
            
        const request = https.request(options, (res) => {
            let data = ''

            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                resolve(JSON.parse(data.toString()))
            })
        })
        
        request.on('error', (error) => {
            reject(error)
        })
        
        request.write(postData)
        request.end()
    })
}
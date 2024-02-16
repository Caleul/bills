import https from 'node:https'
import dotenv from 'dotenv'

export async function getToken(): Promise<{
    token: string,
    expires_in: string
}> {
    dotenv.config()

    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            'client_id': process.env.TOKENGENERATOR_CLIENT_ID,
            'client_secret': process.env.TOKENGENERATOR_CLIENT_SECRET,
        })
        
        const options = {
          hostname: process.env.TOKENGENERATOR_HOSTNAME,
          port: 443,
          path: process.env.TOKENGENERATOR_PATH,
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
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

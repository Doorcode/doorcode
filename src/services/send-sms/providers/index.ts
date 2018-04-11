export interface SMSProvider {
    send: (phoneNumber: string, message: string) => Promise<boolean>
}

import * as Clockwork from 'clockwork'
import * as Raven from 'raven'

const raven = Raven.config(process.env.DOOR_RAVEN_DSN).install()

export class ClockworkProvider implements SMSProvider {
    protected api: Clockwork

    constructor(key: string) {
        this.api = new Clockwork({ key })
    }

    async send(
        phoneNumber: string,
        message: string,
        from?: string,
    ): Promise<boolean> {
        const request = new Promise((resolve, reject) => {
            this.api.sendSms(
                {
                    To: phoneNumber,
                    From: from || process.env.DOORCODE_SMS_SENDER_NAME,
                    Content: message,
                },
                (err, res) => {
                    if (err) return reject(err)

                    resolve(true)
                },
            )
        })

        try {
            const result = (await request) as boolean

            return result
        } catch (error) {
            const err = error as { errDesc: string }
            const e = Error(err.errDesc)
            e.name = 'SMS provider fault'
            Raven.captureException(e)

            return false
        }
    }
}

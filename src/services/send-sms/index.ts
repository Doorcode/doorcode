import { IncomingMessage, ServerResponse } from 'http'
import { json } from 'micro'
import * as moment from 'moment'
import * as Raven from 'raven'
import { ClockworkProvider } from './providers'

interface SendVerificationCodeRequestPayload {
    data: {
        verificationCode: {
            node: {
                application: {
                    name: string
                }
                code: string
                validUntil: string
                identifier: {
                    phoneNumber: {
                        phoneNumber: string
                        countryCode: {
                            dialingCode: string
                        }
                    }
                }
            }
        }
    }
}

const raven = Raven.config(process.env.DOOR_RAVEN_DSN).install()

const handleError = (
    error: Error,
    req: IncomingMessage,
    res: ServerResponse,
): void => {
    error.name = error.message
    Raven.captureException(error, { req }, (e, eventId) => {
        res.statusCode = 500
        res.end(`${error.message} - event id ${eventId}`)
    })
}

export default async (req: IncomingMessage, res: ServerResponse) => {
    const provider = new ClockworkProvider(
        process.env.DOORCODE_SMS_PROVIDER_TOKEN,
    )

    try {
        const request = (await json(req)) as SendVerificationCodeRequestPayload
        const phoneNumber =
            request.data.verificationCode.node.identifier.phoneNumber
        const dialingCode = phoneNumber.countryCode.dialingCode
        const verificationCode = request.data.verificationCode.node.code
        const validUntil = request.data.verificationCode.node.validUntil
        const applicationName =
            request.data.verificationCode.node.application.name

        // Ensure verification code hasn't expired
        if (moment(validUntil).isBefore(moment())) {
            res.statusCode = 400
            res.end('Verfication code has expired')
        } else {
            provider
                .send(
                    `${dialingCode}${phoneNumber.phoneNumber}`,
                    `Here is your verification code: ${verificationCode}`,
                    applicationName,
                )
                .then((success: boolean) => {
                    if (!success) {
                        throw new Error('Sending verification code failed')
                    }

                    res.end(
                        `Sent verification message to +${
                            phoneNumber.countryCode.dialingCode
                        }${phoneNumber.phoneNumber}`,
                    )
                })
                .catch((error: Error) => {
                    handleError(error, req, res)
                })
        }
    } catch (error) {
        const e = error as Error
        handleError(e, req, res)
    }
}

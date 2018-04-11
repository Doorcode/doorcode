import Identifier from '../models/Identifier'
import PhoneNumber from '../models/PhoneNumber'
import VerificationCode from '../models/VerificationCode'

import { isNull } from 'util'
import {
    Identifier as IdentifierResponse,
    PhoneNumber as PhoneNumberResponse,
    Prisma,
} from '../generated/prisma'

import { AuthorizedApplicationResponse, Context } from '../utils'

const upsertPhoneNumber = async (
    phoneNumber: string,
    dialingCode: string,
    db: Prisma,
): Promise<PhoneNumberResponse> => {
    const payload = { phoneNumber, countryCode: { connect: { dialingCode } } }
    const exists = await db.exists.PhoneNumber({ phoneNumber })

    if (exists) {
        return db.mutation.updatePhoneNumber({
            data: payload,
            where: { phoneNumber },
        })
    } else {
        return db.mutation.createPhoneNumber({ data: payload })
    }
}

const upsertIdentifier = async (
    hash: string,
    code: { value: string; validUntil: string },
    phoneNumber: PhoneNumberResponse,
    authorizedApplicationId: string,
    db: Prisma,
): Promise<IdentifierResponse> => {
    const payload = {
        hash,
        phoneNumber: { connect: { id: phoneNumber.id } },
        verificationCodes: {
            create: [
                {
                    code: code.value,
                    validUntil: code.validUntil,
                    application: { connect: { id: authorizedApplicationId } },
                },
            ],
        },
    }
    const exists = await db.exists.Identifier({ hash })

    if (exists) {
        return db.mutation.updateIdentifier(
            {
                data: payload,
                where: { hash },
            },
            '{ user { id isVerified } }',
        )
    } else {
        return db.mutation.createIdentifier({ data: payload })
    }
}

const verifyWithPhoneNumber = async (
    phoneNumber: string,
    dialingCode: string,
    db: Prisma,
    authorizedApplication?: AuthorizedApplicationResponse,
): Promise<{ success: boolean; error?: string }> => {
    try {
        const codeCountryExists: boolean = await db.exists.CountryCode({
            dialingCode,
        })

        if (!PhoneNumber.isValid(phoneNumber) || !codeCountryExists) {
            throw Error('Invalid phone number provided')
        }

        const node = await upsertPhoneNumber(phoneNumber, dialingCode, db)
        const hash = Identifier.generateHash(phoneNumber)
        const code = VerificationCode.generateCode()
        const identifier = await upsertIdentifier(
            hash,
            {
                value: code,
                validUntil: VerificationCode.generateValidUntil(),
            },
            node,
            authorizedApplication.id,
            db,
        )

        if (isNull(identifier)) {
            throw Error("Identifier doesn't exist")
        }

        const user = identifier.user
        if (user) {
            await db.mutation.updateUser({
                data: { isVerified: false },
                where: { id: user.id },
            })
        }

        return { success: true }
    } catch (error) {
        const e = error as Error
        return { success: false, error: e.message }
    }
}

export default verifyWithPhoneNumber

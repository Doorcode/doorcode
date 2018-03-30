import Identifier from '../models/Identifier'
import Indentity from '../models/Identity'
import VerificationCode from '../models/VerificationCode'

import { Context } from '../utils'

import { isNull } from 'util'
import { Prisma } from '../generated/prisma'

const validateCode = async (
    code: string,
    verificationHash: string,
    db: Prisma,
): Promise<{ valid: boolean; token?: string; error?: string }> => {
    try {
        const verificationCodeExists = await db.exists.VerificationCode({
            code,
        })
        const hash: { phoneNumber: string } = Identifier.validateHash(
            verificationHash,
        ) as { phoneNumber: string }

        if (verificationCodeExists && !isNull(hash.phoneNumber)) {
            const verificationCode = await db.query.verificationCode({
                where: {
                    code,
                },
            })

            if (VerificationCode.hasExpired(verificationCode.validUntil)) {
                throw Error(`Code: ${verificationCode.code} has expired`)
            }

            const identifierExists = await db.exists.Identifier({
                hash: verificationHash,
            })

            if (!identifierExists) {
                throw Error(`Identifier doesn't exist`)
            }

            const identifier = await db.query.identifier(
                {
                    where: { hash: verificationHash },
                },
                `{ user { id } verificationCodes(where: { code: "${code}"}) { code } }`,
            )

            // Verify whether hash and code provided belongs to the correct identity
            if (identifier.verificationCodes.length !== 1) {
                throw Error('Verification code and hash mismatch')
            }

            if (identifier.user) {
                const user = await db.mutation.updateUser({
                    data: {
                        isVerified: true,
                    },
                    where: {
                        id: identifier.user.id,
                    },
                })

                return {
                    token: Identifier.generateToken(user.uuid),
                    valid: true,
                }
            } else {
                const uuid = Indentity.generateUUID()
                const user = await db.mutation.createUser({
                    data: {
                        uuid,
                        isVerified: true,
                        identifier: { connect: { hash: verificationHash } },
                    },
                })
                return {
                    token: Identifier.generateToken(user.uuid),
                    valid: true,
                }
            }
        }
    } catch (error) {
        const e = error as Error
        return { valid: false, error: e.message }
    }
}

export default validateCode

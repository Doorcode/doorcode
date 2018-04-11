import { Prisma } from '../generated/prisma'
import Identifier from '../models/Identifier'
import Indentity from '../models/Identity'
import VerificationCode from '../models/VerificationCode'
import AssociateUserWithApp from '../resolvers/AssociateUserWithApp'
import { AuthorizedApplicationResponse, Context } from '../utils'

import { context } from 'raven'
import { isNull } from 'util'

const validateCode = async (
    code: string,
    verificationHash: string,
    db: Prisma,
    authorizedApplication?: AuthorizedApplicationResponse,
): Promise<{ valid: boolean; token?: string; error?: string }> => {
    try {
        const verificationCodeExists = await db.exists.VerificationCode({
            code,
        })

        // Hashes are strings that can be generated based on common data
        // shared between client and server without previously transmitting it
        // such as the user's phone number as a nonce preventing replay attacks
        const hash: { nonce: string } = Identifier.validateHash(
            verificationHash,
        )

        if (verificationCodeExists && !isNull(hash.nonce)) {
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
                { where: { hash: verificationHash } }, // Code and Hash potentially could belong to different identities or none at all
                // Instead of taking a valid hash/code at face value cross reference it
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

                const associatedUser = await AssociateUserWithApp(
                    user.uuid,
                    authorizedApplication.appId,
                    db,
                )

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
                        identifier: {
                            connect: { hash: verificationHash },
                        },
                    },
                })

                const associatedUser = await AssociateUserWithApp(
                    user.uuid,
                    authorizedApplication.appId,
                    db,
                )

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

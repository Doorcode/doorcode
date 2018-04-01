import { Prisma } from '../generated/prisma'
import Identifier from '../models/Identifier'

const exchangeTokenForUser = async (
    token: string,
    db: Prisma,
): Promise<{
    uuid?: string
    error?: string
}> => {
    try {
        const identity = Identifier.validateToken(token)
        const userExists = await db.exists.User({
            uuid: identity.uuid,
        })
        if (!userExists) {
            throw Error(
                "Invalid token provided, requested identity doesn't exist",
            )
        }

        const user = await db.query.user(
            { where: { uuid: identity.uuid } },
            `{ uuid isVerified } `,
        )

        if (!user.isVerified) {
            throw Error('Identity has not been verified')
        }

        return { uuid: user.uuid }
    } catch (error) {
        const e = error as Error
        return { error: e.message }
    }
}

export default exchangeTokenForUser

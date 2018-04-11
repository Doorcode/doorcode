import { IncomingMessage, Server } from 'http'
import * as jwt from 'jsonwebtoken'
import { Prisma } from './generated/prisma'

export interface AuthorizedApplicationResponse {
    id: string
    appId: string
}

export interface Context {
    db: Prisma
    authorizedApplication: null | AuthorizedApplicationResponse
}

export const database = new Prisma({
    endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
    secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
    debug: process.env.NODE_ENV !== 'production', // log all GraphQL queries & mutations
})

export const authorizationExtraction = async (
    req: IncomingMessage,
    db: Prisma,
): Promise<null | AuthorizedApplicationResponse> => {
    try {
        const authorization = req.headers.authorization as string
        const token = authorization.replace('Bearer ', '')
        const decoded = jwt.decode(token) as { appId: string }
        const exists = await db.exists.Application({
            appId: decoded.appId,
        })
        if (exists) {
            const applications = await db.query.applications(
                { where: { appId: decoded.appId } },
                `{ id credentials { secret active } }`,
            )
            if (applications.length > 0) {
                const application = applications.shift() as {
                    id: string
                    credentials: { secret: string; active: boolean }
                }

                if (!application.credentials.active) {
                    throw Error(
                        `Credentials not active for application: ${
                            decoded.appId
                        }`,
                    )
                }

                const verified = jwt.verify(
                    token,
                    application.credentials.secret,
                ) as { appId: string }

                return { id: application.id, appId: verified.appId }
            }
        }
    } catch (error) {
        const e = Error(error.message)
        e.name = 'Authentication failed'
        throw e
    }

    return null
}

import { Prisma } from '../generated/prisma'

const associateUserWithApp = async (
    uuid: string,
    appId: string,
    db: Prisma,
): Promise<{
    success: boolean
    error?: string
}> => {
    try {
        const appExists = await db.exists.Application({ appId })
        const userExists = await db.exists.User({ uuid })

        if (!appExists || !userExists) {
            throw Error('Invalid UUID or AppId')
        }

        const application = (await db.query.applications({
            where: { appId }, // appId can only be used when searching across multiple applications
        })).shift()

        const updatedApplication = await db.mutation.updateApplication({
            data: { users: { connect: { uuid } } },
            where: { id: application.id },
        })

        return { success: updatedApplication != null }
    } catch (error) {
        const e = error as Error
        return { success: false, error: e.message }
    }
}

export default associateUserWithApp

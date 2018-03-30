import { Prisma } from './generated/prisma'

interface Context {
    db: Prisma
}

export { Context }

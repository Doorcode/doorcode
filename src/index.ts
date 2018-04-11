import { GraphQLServer, Options } from '@fabien0102/graphql-yoga' // https://github.com/graphcool/graphql-yoga/pull/209
import { ApolloEngine } from 'apollo-engine'
import { IncomingMessage, Server } from 'http'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'
import { authorizationExtraction, Context, database } from './utils'

import { ContextParameters } from '@fabien0102/graphql-yoga/dist/src/types'
// tslint:disable-next-line:no-implicit-dependencies
import { NextFunction, Request, Response } from 'express-serve-static-core'

interface AuthorizedApplicationRequest extends Request {
    authorization: null | { appId: string }
}

interface AuthorizedApplicationContextParameters extends ContextParameters {
    request: AuthorizedApplicationRequest
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (params: AuthorizedApplicationContextParameters) => ({
        authorizedApplication: params.request.authorization,
        db: database,
    }),
})

server.express.use(
    (req: AuthorizedApplicationRequest, res: Response, next: NextFunction) => {
        authorizationExtraction(req, database)
            .then((app: { appId: string }) => {
                req.authorization = app
                next()
            })
            .catch(error => {
                res.status(401)
                res.send({ message: error.message })
            })
    },
)

const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY,
})

const httpServer = server.configure({
    tracing: true,
    cacheControl: true,
}) as Server

engine.listen(
    {
        port: process.env.HTTP_PORT,
        httpServer,
        graphqlPaths: ['/'],
        launcherOptions: {
            startupTimeout: 3000,
        },
    },
    () => console.info(`Server is running on port ${process.env.HTTP_PORT}`),
)

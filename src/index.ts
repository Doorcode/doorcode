import { GraphQLServer, Options, PubSub } from '@fabien0102/graphql-yoga' // https://github.com/graphcool/graphql-yoga/pull/209
import { ApolloEngine } from 'apollo-engine'
import { Server } from 'http'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

const pubsub = new PubSub()
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
            secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
            debug: process.env.NODE_ENV !== 'production', // log all GraphQL queries & mutations
        }),
        pubsub,
    }),
})

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

server.createSubscriptionServer(httpServer)

import { GraphQLServer, Options } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
            secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
            debug: false, // log all GraphQL queries & mutations
        }),
    }),
})

server.start({ port: 4000 }, (options: Options) =>
    console.info(`Server is running on http://localhost:${options.port}`),
)

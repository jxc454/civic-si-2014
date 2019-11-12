import dbConnections from './database/connection'
import { buildSchema } from 'type-graphql'
import GasResolver from './resolvers/gas'
import CarResolver from './resolvers/car'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'

export default async () => {
    await dbConnections

    const schema = await buildSchema({
        resolvers: [GasResolver, CarResolver],
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    return apolloServer.applyMiddleware({ app })
}

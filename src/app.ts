import dbConnections from './database/connection'
import { buildSchema } from 'type-graphql'
import GasResolver from './resolvers/gas'
import CarResolver from './resolvers/car'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'

const main = async () => {
    await dbConnections

    const PORT = 4000
    const schema = await buildSchema({
        resolvers: [GasResolver, CarResolver]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`listening on port ${PORT}...`))
}

export default main
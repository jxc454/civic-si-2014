import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import GasResolver from './resolvers/gas'
import CarResolver from './resolvers/car';
import dbConnections from "./database/connection";

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

main()
    .then()
    .catch(e => {
        console.log(`ERROR STARTING SERVER: ${e.toString()}`)
        e.details
            ? e.details.forEach(detail =>
                  console.log(`ERROR STARTING SERVER: ${detail.toString()}`)
              )
            : null
    })

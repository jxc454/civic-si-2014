import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import GasResolver from './resolvers/gas'

const main = async () => {
    await createConnection()

    const PORT = 4000
    const schema = await buildSchema({
        resolvers: [GasResolver]
    })

    const apolloServer = new ApolloServer({ schema })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`listening on port ${PORT}...`))
}

main()
    .then()
    .catch(e => {
        e.details.forEach(detail => console.log(`ERROR STARTING SERVER: ${detail.toString()}`))
    })

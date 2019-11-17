import dbConnections from './database/connection'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import schema from './schema'

const PORT = 4000

// TODO refactor once Express is actually needed for something
const main = async () => {
    await dbConnections

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
    })

    const app = Express()

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`listening on port ${PORT}...`))
}

export default main

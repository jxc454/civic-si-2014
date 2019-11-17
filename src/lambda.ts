import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-lambda'
import schema from './schema'
import dbConnections from './database/connection'

function runApollo(event, context, apolloHandler) {
    return new Promise((resolve, reject) => {
        const callback = (error, body) =>
            error ? reject(error) : resolve(body)
        apolloHandler(event, context, callback)
    })
}

export async function handler(event, context) {
    await dbConnections
    const server = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
    })

    const apolloHandler = server.createHandler({ cors: { origin: '*' } })
    return await runApollo(event, context, apolloHandler)
}

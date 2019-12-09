import dbConnections from './database/connection'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import Express from 'express'
import schema from './schema'
import cors from 'cors'
import { OAuth2Client } from 'google-auth-library'
import config from 'config'

const PORT = 4000
const clientId = config.get('google-client-id')
const oAuth2Client = new OAuth2Client(clientId, config.get('google-api-key'))

async function validateToken(token): Promise<[string, Error]> {
    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: token,
            audience: clientId,
        })

        const payload = ticket.getPayload()
        return [payload['email'], undefined]
    } catch (err) {
        console.log('validate token FAILED')
        console.log(err)

        return ['', new AuthenticationError('authentication error here')]
    }
}

// TODO refactor once Express is actually needed for something
const main = async () => {
    await dbConnections

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
        context: async ({ req }) => {
            const bearerToken = req.headers.authorization || ''
            const [, token] = bearerToken.split(' ')
            const [userEmail, err] = await validateToken(token)
            if (err) console.log(err)
            return { token, userEmail }
        },
    })

    const app = Express()
    app.use(cors())

    apolloServer.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`listening on port ${PORT}...`))
}

export default main

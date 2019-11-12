import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema } from 'type-graphql'
import GasResolver from './resolvers/gas'
import CarResolver from './resolvers/car';
import dbConnections from './database/connection';

import app from './app'

app()
    .then()
    .catch(e => {
        console.log(`ERROR STARTING SERVER: ${e.toString()}`)
        e.details
            ? e.details.forEach(detail =>
                  console.log(`ERROR STARTING SERVER: ${detail.toString()}`)
              )
            : null
    })

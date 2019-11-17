import 'reflect-metadata'
import { createConnection } from 'typeorm'
import Car from '../entities/car.entity'
import Gas from '../entities/gas.entity'

async function dbConnection() {
    // require this manually to avoid complications with webpack
    const connectionOptions = require('../../ormconfig.json')

    return createConnection(
        Object.assign({}, connectionOptions, {
            entities: [Car, Gas],
            host: process.env.TYPEORM_HOST,
            password: process.env.TYPEORM_PASSWORD,
        })
    )
}

export default dbConnection()

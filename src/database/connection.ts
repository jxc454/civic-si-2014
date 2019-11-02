import config from 'config'
import 'reflect-metadata'
import { createConnections, Connection, ConnectionOptions } from 'typeorm'

const dbCfg: ConnectionOptions = config.get('db')

console.log(dbCfg)

const dbConnections: Promise<Connection[]> = createConnections([
    { ...dbCfg }
]);

export default dbConnections

import CarResolver from './resolvers/car'
import GasResolver from './resolvers/gas'
import { buildSchemaSync } from 'type-graphql'

export default buildSchemaSync({
    resolvers: [CarResolver, GasResolver],
})

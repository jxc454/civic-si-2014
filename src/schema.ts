import CarResolver from './resolvers/car'
import GasResolver from './resolvers/gas'
import { buildSchemaSync } from 'type-graphql'
import { customAuthChecker} from './auth';

export default buildSchemaSync({
    resolvers: [CarResolver, GasResolver],
    authChecker: customAuthChecker
})

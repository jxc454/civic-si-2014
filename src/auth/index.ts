import { AuthChecker } from 'type-graphql'
import config from 'config'
import { flow, toPairs, includes } from 'lodash'
import { AuthenticationError } from 'apollo-server-express'

function getRolesForUser(userEmail): string[] {
    const existingRoles = flow([
        toPairs,
        pairs => pairs.filter(([, users]) => includes(users, userEmail)),
        filteredPairs => filteredPairs.map(([role]) => role.toUpperCase()),
    ])(config.get('users'))

    // if existing roles contains ADMIN, then add all other roles
    if (includes(existingRoles, 'ADMIN')) {
        console.log(
            existingRoles.concat(
                Object.keys(config.get('users')).map(d => d.toUpperCase())
            )
        )
        return existingRoles.concat(
            Object.keys(config.get('users')).map(d => d.toUpperCase())
        )
    } else {
        console.log(existingRoles)
        return existingRoles
    }
}

export const customAuthChecker: AuthChecker<{ token; userEmail }> = (
    { root, args, context: { userEmail }, info },
    roles
) => {
    if (!roles.length) {
        // if `@Authorized()`, check only is user exist
        // return userEmail !== undefined
        return true
    }

    // there are some roles defined now
    if (!userEmail) {
        // and if no user, restrict access
        // return false
        throw new AuthenticationError('authentication error')
    }

    if (getRolesForUser(userEmail).some(role => roles.includes(role))) {
        // grant access if the roles overlap
        return true
    }

    // no roles matched, restrict access
    // return false
    throw new AuthenticationError('authentication error')
}

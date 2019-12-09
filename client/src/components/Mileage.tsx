import React from 'react'
import {
    useAddGasMutation,
    useMileageByDateQuery,
} from '../generated/queries.d'
import CarLogin from './CarLogin'

export default function Mileage() {
    const { loading, error, data } = useMileageByDateQuery({
        variables: {
            carId: 1,
        },
    })

    const [addGas] = useAddGasMutation({
        variables: {
            input: {
                carId: 1,
                date: new Date(),
                octane: 93,
                price: 3.01,
                gallons: 10,
                total: 30.1,
                mileage: new Date().getMilliseconds() / 50000,
            },
        },
    })

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        console.log('IN MILEAGE ERROR')
        console.log(error)
        const isAuthError = error.graphQLErrors
            .map(e => {
                return e.hasOwnProperty('extensions') && e.extensions
                    ? e.extensions.code
                    : ''
            })
            .some(d => d == 'UNAUTHENTICATED')
        return isAuthError ? (
            <div>
                <h1>not authorized, try logging in</h1>
                {CarLogin(() => (
                    <Mileage />
                ))}
                />
            </div>
        ) : (
            <h1>{JSON.stringify(error)}</h1>
        )
    }

    return (
        <h1>
            {data &&
                data.getMileageByDate.map(d => (
                    <div>
                        <div key={1}>{d.mileage}</div>
                        <div key={2}>{d.date}</div>
                    </div>
                ))}
            <button onClick={() => addGas()}>Add Gas</button>
        </h1>
    )
}

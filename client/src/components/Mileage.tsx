import React from 'react'
import { useMileageByDateQuery } from '../generated/queries.d'

export default function Mileage() {
    const { loading, error, data } = useMileageByDateQuery({
        variables: {
            carId: 1
        }
    })

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error!</h1>

    return (
        <h1>
            {data && data.getMileageByDate.map(d => (
                <div>
                    <div key={1}>{d.mileage}</div>
                    <div key={2}>{d.date}</div>
                </div>
            ))}
        </h1>
    )
}

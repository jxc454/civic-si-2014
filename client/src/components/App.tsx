import React from 'react'
import '../styles/index.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Mileage from './Mileage'
import store from 'store'
import CarLogin from './CarLogin'

function App() {
    const token = store.get('car-log-id-token')

    const client = new ApolloClient({
        uri: process.env.CAR_LOG_API,
        request: operation => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : '',
                },
            })
        },
    })

    const page = (
        <ApolloProvider client={client}>
            <Mileage />
        </ApolloProvider>
    )

    return token ? page : CarLogin(() => <App />)
}

export default App

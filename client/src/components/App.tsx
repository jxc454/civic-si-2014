import React from 'react'
import '../styles/index.css'
import ApolloClient, { gql } from 'apollo-boost'

class App extends React.PureComponent {
    render() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/graphql',
        })

        client
            .query({
                query: gql`
                    {
                        getMileageByDate(car: 1) {
                            mileage
                        }
                    }
                `,
            })
            .then(result => {
              const { data } = result
              console.log(
                `result: ${JSON.stringify(
                  data.getMileageByDate.map((d: { mileage: any; }) => d.mileage)
                )}`
              )
            }

            )

        return (
            <div>
                <h1>Hello World!</h1>
            </div>
        )
    }
}

export default App

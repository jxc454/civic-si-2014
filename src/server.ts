import 'reflect-metadata'
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

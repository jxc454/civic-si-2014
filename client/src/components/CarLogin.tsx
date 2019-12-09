import { GoogleLogin, GoogleLoginResponse } from 'react-google-login'
import store from 'store'
import React, { ReactElement } from 'react'

export default function CarLogin(callback: () => ReactElement) {
    return (
        <GoogleLogin
            responseType={'permission'}
            onSuccess={res => {
                console.log('IN GOOGLE LOGIN SUCCESS')
                console.log(res)
                const googleResponse: GoogleLoginResponse = (res as unknown) as GoogleLoginResponse
                store.set('car-log-id-token', googleResponse.tokenId)
                callback()
            }}
            onFailure={err => {
                console.log('IN GOOGLE LOGIN FAILURE')
                console.log(err)
                store.remove('car-log-id-token')
                callback()
            }}
            clientId={CONFIG['google-client-id']}
        />
    )
}

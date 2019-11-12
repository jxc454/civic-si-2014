// import serverless from 'aws-serverless-express'
// import server from './server'
//
// const lambdaServer = serverless.createServer(server)
// exports.handler = (event, context) =>
//     lambdaServer.proxy(lambdaServer, event, context)

'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./server')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

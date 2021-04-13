import server from './grpc.js'
import { port } from './config.js'
import logger from './logger.js'

async function run() {
  server.start(`0.0.0.0:${port}`)
  logger
    .withScope('application')
    .withTag('run')
    .success(`Application booted on port=${port}`)
}

run()

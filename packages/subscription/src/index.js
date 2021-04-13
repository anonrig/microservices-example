import server from './grpc.js'
import { port } from './config.js'
import logger from './logger.js'
import pg from './pg.js'

async function run() {
  server.start(`0.0.0.0:${port}`)
  await pg.raw('select 1+1 as result')
  logger
    .withScope('application')
    .withTag('run')
    .success(`Application booted on port=${port}`)
}

run()

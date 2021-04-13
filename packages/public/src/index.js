import { port } from './config.js'
import logger from './logger.js'
import { build } from './server.js'

async function run() {
  const server = await build()
  await server.listen(port, '0.0.0.0')
  logger
    .withScope('application')
    .withTag('run')
    .success(`Application booted on port=${port}`)
}

run()

import path from 'path'
import Mali from 'mali'
import Logger from './logger.js'
import * as Email from './consumers.js'

const logger = Logger.create().withScope('grpc')
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
const file = path.join(
  path.resolve('.'),
  './node_modules/@microservices/proto/lib/email.proto',
)
const health = path.join(
  path.resolve('.'),
  './node_modules/@microservices/proto/lib/health.proto',
)

const app = new Mali()

app.addService(file, 'Email', options)
app.addService(health, 'Health', options)

app.use(async (context, next) => {
  logger.withScope('grpc').debug(`Receiving ${context.fullName}`)
  return next()
})

app.use({ Email })
app.use('grpc.health.v1.Health', 'Check', (ctx) => (ctx.res = { status: 1 }))

app.on('error', (error) => {
  if (!error.code) {
    logger.fatal(error)
  }
})

export default app

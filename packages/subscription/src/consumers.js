import * as Subscription from './models/subscription.js'
import Logger from './logger.js'
import { producer } from './kafka.js'
import { sendEmailTopic } from './config.js'

const logger = Logger.create().withScope('consumers')

export async function findAll(ctx) {
  ctx.res = {
    rows: await Subscription.findAll(ctx.req),
  }
}

export async function findOne(ctx) {
  const { subscription_id } = ctx.req
  ctx.res = await Subscription.findOne({ subscription_id })
}

export async function create(ctx) {
  const subscription = await Subscription.create(ctx.req)

  logger.withTag('create').info(`Sending an email to ${ctx.req.email}`)

  setImmediate(
    async () =>
      await producer.send({
        topic: sendEmailTopic,
        messages: [{ value: JSON.stringify(ctx.req) }],
      }),
  )

  ctx.res = subscription
}

export async function cancel(ctx) {
  const { subscription_id } = ctx.req
  ctx.res = await Subscription.cancel({ subscription_id })
}

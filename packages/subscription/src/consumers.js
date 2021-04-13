import * as Subscription from './models/subscription.js'

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
  ctx.res = await Subscription.create(ctx.req)
}

export async function cancel(ctx) {
  const { subscription_id } = ctx.req
  ctx.res = await Subscription.cancel({ subscription_id })
}

import { sendEmail } from './provider.js'

export async function send(ctx) {
  await sendEmail(ctx.req)
  ctx.res = {}
}

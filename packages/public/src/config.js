const { PORT, SUBSCRIPTIONS_URL } = process.env

export const port = PORT ?? 3000
export const subscriptionsUrl = SUBSCRIPTIONS_URL ?? '0.0.0.0:3001'

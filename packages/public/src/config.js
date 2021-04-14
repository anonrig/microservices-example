const { PORT, SUBSCRIPTIONS_URL, KAFKA_CLIENT_ID, KAFKA_BROKER } = process.env

export const port = PORT ?? 3000
export const subscriptionsUrl = SUBSCRIPTIONS_URL ?? '0.0.0.0:3001'

export const kafkaClientId = KAFKA_CLIENT_ID ?? 'public-worker'
export const kafkaBroker = KAFKA_BROKER ?? '0.0.0.0:9093'

export const subscriptionCreateTopic = 'subscription-create'
export const subscriptionDeleteTopic = 'subscription-delete'

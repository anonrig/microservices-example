const {
  PORT,
  EMAIL_URL,
  KAFKA_CLIENT_ID,
  KAFKA_BROKER,
  KAFKA_CONSUMER_GROUP_ID,
} = process.env

export const port = PORT ?? 3001
export const emailUrl = EMAIL_URL ?? '0.0.0.0:3002'

export const kafkaClientId = KAFKA_CLIENT_ID ?? 'subscription-worker'
export const kafkaBroker = KAFKA_BROKER ?? 'localhost:9093'
export const kafkaConsumerGroupId =
  KAFKA_CONSUMER_GROUP_ID ?? 'subscription-group'

export const subscriptionCreateTopic = 'subscription-create'
export const subscriptionDeleteTopic = 'subscription-delete'
export const sendEmailTopic = 'email-send'

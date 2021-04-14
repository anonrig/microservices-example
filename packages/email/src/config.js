const {
  PORT,
  KAFKA_CLIENT_ID,
  KAFKA_BROKER,
  KAFKA_CONSUMER_GROUP_ID,
} = process.env

export const port = PORT ?? 3002

export const kafkaClientId = KAFKA_CLIENT_ID ?? 'email-worker'
export const kafkaBroker = KAFKA_BROKER ?? 'localhost:9093'
export const kafkaConsumerGroupId = KAFKA_CONSUMER_GROUP_ID ?? 'email-group'

export const sendEmailTopic = 'email-send'

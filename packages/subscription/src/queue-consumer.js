import { consumer, producer } from './kafka.js'
import {
  subscriptionCreateTopic,
  subscriptionDeleteTopic,
  sendEmailTopic,
} from './config.js'
import * as Subscriptions from './models/subscription.js'
import Logger from './logger.js'

export async function listenToQueue() {
  const logger = Logger.create().withScope('listenToQueue')
  await consumer.connect()
  logger.info(`Listening to queue on Kafka consumer`)
  await consumer.subscribe({
    topic: subscriptionCreateTopic,
    fromBeginning: true,
  })
  await consumer.subscribe({
    topic: subscriptionDeleteTopic,
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger
        .withTag('consumer.eachMessage')
        .info(`Received message with topic=${topic} on partition=${partition}`)
      const payload = JSON.parse(message.value)

      if (topic === subscriptionCreateTopic) {
        await Subscriptions.create(payload)

        logger
          .withTag('consumer.eachMessage')
          .info(`Sending an email to ${payload.email}`)
        setImmediate(
          async () =>
            await producer.send({
              topic: sendEmailTopic,
              messages: [{ value: message.value }],
            }),
        )
      } else if (topic === subscriptionDeleteTopic) {
        await Subscriptions.cancel(payload)
      } else {
        logger
          .withTag('consumer.eachMessage')
          .warn(`Received unknown topic=${topic} on partition=${partition}`)
      }
    },
  })
}

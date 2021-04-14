import { consumer } from './kafka.js'
import { sendEmail } from './provider.js'
import { sendEmailTopic } from './config.js'
import Logger from './logger.js'

export async function listenToQueue() {
  const logger = Logger.create().withScope('listenToQueue')
  await consumer.connect()
  logger.info(`Listening to queue on Kafka consumer`)
  await consumer.subscribe({
    topic: sendEmailTopic,
    fromBeginning: true,
  })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger
        .withTag('consumer.eachMessage')
        .info(`Received message with topic=${topic} on partition=${partition}`)

      const payload = JSON.parse(message.value)

      if (topic === sendEmailTopic) {
        await sendEmail({
          to: payload.email,
          title: 'Successfully subscribed',
          body: 'You have successfully subscribed to our newsletter.',
        })
      } else {
        logger
          .withTag('consumer.eachMessage')
          .warn(`Received unknown topic=${topic} on partition=${partition}`)
      }
    },
  })
}

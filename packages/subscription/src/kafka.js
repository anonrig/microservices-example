import { kafkaClientId, kafkaBroker, kafkaConsumerGroupId } from './config.js'
import { Kafka, logLevel } from 'kafkajs'

export const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: [kafkaBroker],
  logLevel: logLevel.ERROR,
})

export const producer = kafka.producer()
export const consumer = kafka.consumer({ groupId: kafkaConsumerGroupId })

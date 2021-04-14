import { v4 } from 'uuid'
import grpc from '../../grpc.js'
import { producer } from '../../kafka.js'
import { subscriptionDeleteTopic } from '../../config.js'
import logger from '../../logger.js'

export default {
  method: 'DELETE',
  path: '/:subscription_id',
  schema: {
    description: 'Cancel Subscription',
    params: {
      type: 'object',
      properties: {
        subscription_id: { type: 'string' },
      },
      required: ['subscription_id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          subscription_id: {
            type: 'string',
            description: 'Subscription identifier',
            example: v4(),
          },
        },
        required: ['subscription_id'],
      },
      404: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 404,
            description: 'Status Code',
          },
          error: {
            type: 'string',
            example: 'Not Found',
            description: 'Error title',
          },
          message: {
            type: 'string',
            example: 'Subscription not found',
            description: 'Error message',
          },
        },
        required: ['statusCode', 'error', 'message'],
      },
    },
  },
  // preHandler: verify,
  handler: async ({ params: { subscription_id } }) => {
    try {
      // first try to send it using grpc to check availability.
      await grpc.subscriptions.cancel({ subscription_id })
      return { subscription_id }
    } catch (error) {
      // if no grpc clients are available to handle request, put it in the queue

      logger.warn(
        `Received exception while cancelling subscription. Trying on Kafka queue.`,
        error.message,
      )
      await producer.send({
        topic: subscriptionDeleteTopic,
        messages: [
          {
            value: JSON.stringify({ subscription_id }),
            timestamp: Date.now(),
          },
        ],
      })
      return { subscription_id }
    }
  },
}

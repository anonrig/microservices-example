import { v4 } from 'uuid'
import grpc from '../../grpc.js'
import { producer } from '../../kafka.js'
import { subscriptionCreateTopic } from '../../config.js'
import logger from '../../logger.js'

export default {
  method: 'POST',
  path: '/',
  schema: {
    description: 'Create Subscription',
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'Email address',
          example: 'hello@world.com',
        },
        first_name: {
          type: 'string',
          description: 'Name of the subscriber',
          example: 'John',
        },
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: 'Gender of the subscriber',
          example: 'male',
        },
        date_of_birth: {
          type: 'string',
          description: 'Birth date of the subscriber',
          example: '15-09-1992',
        },
        consent_flag: {
          type: 'boolean',
          description: 'Subscribers consent to communicate',
          example: true,
        },
        newsletter_id: {
          type: 'string',
          description: 'Internal newsletter id',
          example: '1',
        },
      },
      required: ['email', 'date_of_birth', 'consent_flag', 'newsletter_id'],
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
      400: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 400,
            description: 'Status code',
          },
          error: {
            type: 'string',
            example: 'Bad Request',
            description: 'Error title',
          },
          message: {
            type: 'string',
            example: `body should have required property 'email'`,
            description: 'Error description',
          },
        },
        required: ['statusCode', 'error', 'message'],
      },
    },
  },
  handler: async ({ body }) => {
    const subscription_id = v4()

    try {
      // first try to send it using grpc to check availability.
      await grpc.subscriptions.create(
        Object.assign({}, body, { subscription_id }),
      )
    } catch (error) {
      // if no grpc clients are available to handle request, put it in the queue
      logger.warn(
        `Received exception while cancelling subscription. Trying on Kafka queue.`,
        error.message,
      )

      await producer.send({
        topic: subscriptionCreateTopic,
        messages: [
          {
            value: JSON.stringify(Object.assign({}, body, { subscription_id })),
            timestamp: Date.now(),
          },
        ],
      })
    }

    return { subscription_id }
  },
}

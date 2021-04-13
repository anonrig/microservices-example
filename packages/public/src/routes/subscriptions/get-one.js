import { v4 } from 'uuid'
import grpc from '../../grpc.js'

export default {
  method: 'GET',
  path: '/:subscription_id',
  schema: {
    description: 'Get a Subscription',
    params: {
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
    response: {
      200: {
        type: 'object',
        properties: {
          subscription_id: {
            type: 'string',
            description: 'Subscription identifier',
            example: v4(),
          },
          email: {
            type: 'string',
            description: 'Email address',
            example: 'hello@world.com',
          },
          first_name: {
            type: 'string',
            description: 'Subscriber first name',
            example: 'John',
          },
          gender: {
            type: 'string',
            enum: ['male', 'female'],
            description: 'Subscribers gender',
            example: 'female',
          },
          date_of_birth: {
            type: 'string',
            description: 'Date of birth',
            example: '15-09-1992',
          },
          consent_flag: {
            type: 'boolean',
            description: 'Subscribers consent to communicate',
            example: true,
          },
          newsletter_id: {
            type: 'string',
            description: 'Internal newsletter identifier',
            example: 1,
          },
        },
        required: [
          'subscription_id',
          'email',
          'date_of_birth',
          'consent_flag',
          'newsletter_id',
        ],
      },
      404: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 404,
            description: 'Status code',
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
  handler: async ({ params: { subscription_id } }) =>
    grpc.subscriptions.findOne({ subscription_id }),
}

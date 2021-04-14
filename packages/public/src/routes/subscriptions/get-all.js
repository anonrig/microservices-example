import { v4 } from 'uuid'
import grpc from '../../grpc.js'

export default {
  method: 'GET',
  path: '/',
  schema: {
    description: 'Filter Subscriptions',
    query: {
      type: 'object',
      properties: {
        gender: {
          type: 'string',
          enum: ['male', 'female'],
          description: 'Gender',
          example: 'female',
        },
        consent_flag: {
          type: 'boolean',
          description: 'Subscribers consent to communicate',
          example: true,
        },
        date_of_birth: {
          type: 'string',
          description: 'Date of birth',
          example: '15-09-1992',
        },
        newsletter_id: {
          type: 'string',
          description: 'Internal newsletter identifier',
          example: '1',
        },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
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
      },
    },
  },
  handler: async ({ query }) => {
    const { rows } = await grpc.subscriptions.findAll(query)
    return rows
  },
}

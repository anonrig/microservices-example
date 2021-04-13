import { v4 } from 'uuid'
import grpc from '../../grpc.js'

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
  handler: async ({ params: { subscription_id } }) =>
    grpc.subscriptions.cancel({ subscription_id }),
}

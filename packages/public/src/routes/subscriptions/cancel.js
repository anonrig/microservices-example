import grpc from '../../grpc.js'

export default {
  method: 'DELETE',
  path: '/:subscription_id',
  schema: {
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
          subscription_id: { type: 'string' },
        },
        required: ['subscription_id'],
      },
      404: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          error: { type: 'string', example: 'Not Found' },
          message: { type: 'string', example: 'Subscription not found' },
        },
        required: ['statusCode', 'error', 'message'],
      },
    },
  },
  // preHandler: verify,
  handler: async ({ params: { subscription_id } }) =>
    grpc.subscriptions.cancel({ subscription_id }),
}

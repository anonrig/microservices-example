import grpc from '../../grpc.js'

export default {
  method: 'GET',
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
          email: { type: 'string' },
          first_name: { type: 'string' },
          gender: { type: 'string' },
          date_of_birth: { type: 'string' },
          consent_flag: { type: 'boolean' },
          newsletter_id: { type: 'string' },
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
          statusCode: { type: 'number', example: 404 },
          error: { type: 'string', example: 'Not Found' },
          message: { type: 'string', example: 'Subscription not found' },
        },
        required: ['statusCode', 'error', 'message'],
      },
    },
  },
  handler: async ({ params: { subscription_id } }) =>
    grpc.subscriptions.findOne({ subscription_id }),
}

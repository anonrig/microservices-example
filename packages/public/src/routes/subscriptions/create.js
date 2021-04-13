import grpc from '../../grpc.js'

export default {
  method: 'POST',
  path: '/',
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        first_name: { type: 'string' },
        gender: { type: 'string' },
        date_of_birth: { type: 'string' },
        consent_flag: { type: 'boolean' },
        newsletter_id: { type: 'string' },
      },
      required: ['email', 'date_of_birth', 'consent_flag', 'newsletter_id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          subscription_id: { type: 'string' },
        },
        required: ['subscription_id'],
      },
      400: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          error: { type: 'string', example: 'Bad Request' },
          message: {
            type: 'string',
            example: `body should have required property 'email'`,
          },
        },
        required: ['statusCode', 'error', 'message'],
      },
    },
  },
  // preHandler: verify,
  handler: async ({ body }) => grpc.subscriptions.create(body),
}

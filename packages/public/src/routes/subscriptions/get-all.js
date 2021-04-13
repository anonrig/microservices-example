import grpc from '../../grpc.js'

export default {
  method: 'GET',
  path: '/',
  schema: {
    query: {
      type: 'object',
      properties: {
        gender: { type: 'string' },
        consent_flag: { type: 'boolean' },
        date_of_birth: { type: 'string' },
        newsletter_id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
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
      },
    },
  },
  // preHandler: verify,
  handler: async ({ query }) => grpc.subscriptions.findAll(query),
}

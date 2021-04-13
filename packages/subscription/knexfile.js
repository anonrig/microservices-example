import Knex from 'knex'

/**
 * @type {Knex.Config}
 */
const config = {
  client: 'pg',
  version: '13',
  connection: {
    database: 'subscriptions',
    user: 'subscription-worker',
    port: 5432,
    password: 'MYSUPERSECRETKEY',
  },
  pool: { min: 0, max: 5 },
  searchPath: ['public'],
  useNullAsDefault: false,
  asyncStackTraces: true,
}
export default config

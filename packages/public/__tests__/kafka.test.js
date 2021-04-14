import test from 'ava'
import { v4 } from 'uuid'
import quibble from 'quibble'
import { mockGrpc, mockKafka } from './mocks.js'

test.serial('should call kafka on grpc error', async (t) => {
  const subscription_id = v4()

  await mockGrpc({
    subscriptions: {
      cancel: (calledWith) => {
        t.deepEqual(calledWith, { subscription_id })
        return Promise.reject(new Error(`Invalid`))
      },
    },
  })
  await mockKafka({
    producer: {
      send: () => Promise.resolve({}),
    },
  })
  t.teardown(() => quibble.reset())

  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'DELETE',
    url: `/v1/subscriptions/${subscription_id}`,
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.is(response.subscription_id, subscription_id)
})

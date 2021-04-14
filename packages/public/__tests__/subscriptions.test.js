import test from 'ava'
import { v4 } from 'uuid'
import quibble from 'quibble'
import { mockGrpc } from './mocks.js'

test.serial('should create a subscription', async (t) => {
  const payload = {
    email: 'hello@world.com',
    newsletter_id: v4(),
    subscription_id: v4(),
    date_of_birth: new Date(),
    consent_flag: true,
  }
  await mockGrpc({
    subscriptions: {
      create: (calledWith) => {
        // we can't do a deepEqual to calledWith since it adds subscription_id dynamically.
        t.deepEqual(calledWith.email, payload.email)
        t.truthy(!!calledWith.subscription_id)
        return Promise.resolve(payload)
      },
    },
  })
  t.teardown(() => quibble.reset())
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'POST',
    url: '/v1/subscriptions',
    payload,
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.truthy(!!response.subscription_id)
})

test.serial('should cancel a subscription', async (t) => {
  const payload = { subscription_id: v4() }
  await mockGrpc({
    subscriptions: {
      cancel: (calledWith) => {
        t.deepEqual(calledWith, payload)
        return Promise.resolve(payload)
      },
    },
  })
  t.teardown(() => quibble.reset())
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'DELETE',
    url: `/v1/subscriptions/${payload.subscription_id}`,
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.deepEqual(response.subscription_id, payload.subscription_id)
})

test.serial('should return subscriptions', async (t) => {
  await mockGrpc({
    subscriptions: {
      findAll: (calledWith) => {
        t.deepEqual(calledWith, {})
        return Promise.resolve({ rows: [] })
      },
    },
  })
  t.teardown(() => quibble.reset())
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/v1/subscriptions',
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.truthy(Array.isArray(response) === true)
})

test.serial('should return valid subscription', async (t) => {
  const payload = {
    email: 'hello@world.com',
    newsletter_id: v4(),
    subscription_id: v4(),
    date_of_birth: new Date(),
    consent_flag: true,
  }
  await mockGrpc({
    subscriptions: {
      findOne: (calledWith) => {
        t.deepEqual(calledWith, { subscription_id: payload.subscription_id })
        return Promise.resolve(payload)
      },
    },
  })
  t.teardown(() => quibble.reset())

  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: `/v1/subscriptions/${payload.subscription_id}`,
    query: payload,
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.is(response.email, payload.email)
  t.is(response.newsletter_id, payload.newsletter_id)
  t.is(response.subscription_id, payload.subscription_id)
})

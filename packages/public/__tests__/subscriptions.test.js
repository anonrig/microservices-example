import test from 'ava'
import { v4 } from 'uuid'

test('should create a subscription', async (t) => {
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'POST',
    url: '/v1/subscriptions',
    payload: { name: 'non-existent', timestamp: Date.now() },
  })
  const response = JSON.parse(body)
  t.is(statusCode, 400)
  t.is(response.error, 'Bad Request')
  t.truthy(
    response.message.includes(`body should have required property 'email'`),
    response.message,
  )
})

test('should cancel a subscription', async (t) => {
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'DELETE',
    url: '/v1/subscriptions',
    payload: { email: 'hello@world.com', newsletter_id: v4() },
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.truthy(response.state)
})

test('should return subscriptions', async (t) => {
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

test('should return valid subscription', async (t) => {
  const payload = { email: 'hello@world.com', newsletter_id: v4() }
  const { build } = await import('../src/server.js')
  const server = await build()
  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/v1/subscriptions/find-one',
    query: payload,
  })
  const response = JSON.parse(body)
  t.is(statusCode, 200)
  t.is(response.email, payload.email)
  t.is(response.newsletter_id, payload.newsletter_id)
})

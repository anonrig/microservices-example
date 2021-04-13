import subscriptions from './subscriptions/index.js'

export default (f, _opts, done) => {
  f.register(subscriptions, { prefix: 'subscriptions' })
  done()
}

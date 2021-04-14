import grpc from '@grpc/grpc-js'
import loader from '@grpc/proto-loader'
import path from 'path'
import { subscriptionsUrl } from './config.js'
import promisifyAll from './libraries/promisify-all.js'

const defaults = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const { Subscriptions } = grpc.loadPackageDefinition(
  loader.loadSync(
    path.join(path.resolve('.'), './protofiles/subscriptions.proto'),
    defaults,
  ),
)

export default {
  subscriptions: promisifyAll(
    new Subscriptions(subscriptionsUrl, grpc.credentials.createInsecure()),
  ),
}

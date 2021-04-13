/* eslint-disable security/detect-object-injection */
import { promisify } from 'util'

export default function promisifyAll(client) {
  const to = {}
  for (var k in client) {
    if (typeof client[k] !== 'function') continue
    to[k] = promisify(client[k].bind(client))
  }
  return to
}

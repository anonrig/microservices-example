import quibble from 'quibble'

export async function mockGrpc(returns = null) {
  await quibble.esm('../src/grpc.js', returns, returns)
}

export async function mockKafka(returns = null) {
  await quibble.esm('../src/kafka.js', returns, returns)
}

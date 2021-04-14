# Public

## Tech stack

- Node.js - ESM enabled
- Fastify
- GRPC

## Environment variables

| Name              |  Default Value   |      Description       |
| :---------------- | :--------------: | :--------------------: |
| PORT              |       3000       | Port number to work in |
| SUBSCRIPTIONS_URL |   0.0.0.0:3001   | Subscriptions GRPC url |
| KAFKA_CLIENT_ID   |  public-worker   |    Kafka client id     |
| KAFKA_BROKER      | 'localhost:9092' | Kafka broker endpoint  |

## Running

- Navigate to existing folder

```bash
cd packages/public
```

- Run on development mode

```bash
npm start
```

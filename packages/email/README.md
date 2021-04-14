# Email

## Tech stack

- Node.js - ESM enabled
- Mali
- Kafkajs

## Environment variables

| Name                    | Default Value  |       Description       |
| :---------------------- | :------------: | :---------------------: |
| PORT                    |      3002      | Port number to work in  |
| KAFKA_CLIENT_ID         |  email-worker  |     Kafka client id     |
| KAFKA_BROKER            | localhost:9093 |  Kafka broker endpoint  |
| KAFKA_CONSUMER_GROUP_ID |  email-group   | Kafka consumer group id |

## Running

- Navigate to existing folder

```bash
cd packages/email
```

- Run on development mode and enable fast refresh

```bash
npm start
```

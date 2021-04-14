# Subscription

## Tech stack

- Node.js - ESM enabled
- Mali

## Environment variables

| Name                    |    Default Value    |       Description       |
| :---------------------- | :-----------------: | :---------------------: |
| PORT                    |        3001         | Port number to work in  |
| EMAIL_URL               |    0.0.0.0:3002     |     Email GRPC url      |
| KAFKA_CLIENT_ID         | subscription-worker |     Kafka client id     |
| KAFKA_BROKER            |   localhost:9093    |  Kafka broker endpoint  |
| KAFKA_CONSUMER_GROUP_ID | subscription-group  | Kafka consumer group id |

## Preparation

Initialize the database:

    psql < db/globals.sql
    psql -1 subscription < db/schema/*

## Running

- Navigate to existing folder

```bash
cd packages/subscription
```

- Run on development mode and enable fast refresh

```bash
npm start
```

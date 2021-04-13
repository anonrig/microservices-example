# Subscription

## Tech stack

- Node.js - ESM enabled
- Mali

## Environment variables

| Name      | Default Value |      Description       |
| :-------- | :-----------: | :--------------------: |
| PORT      |     3001      | Port number to work in |
| EMAIL_URL | 0.0.0.0:3002  |     Email GRPC url     |

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

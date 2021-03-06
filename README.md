# Microservices with GRPC and Kafka on Node.js

This is an example microservices architecture which uses GRPC communication between microservices for requests that need instant reply, and uses fault-tolerant messaging queue for HA.

Each microservice supports both GRPC communication and consumption through Kafka topics. If you need to get a response from a certain microservice, GRPC is recommended. If the task can be done asyncronously, please do it within Kafka's boundaries.

## Architecture Overview

![Architecture Overview](https://raw.githubusercontent.com/anonrig/microservices-example/main/k8s/architecture.png)

## Requirements

- Node (preferably >= 15, since ESM is enabled by default)
- PostgreSQL (preferably >= 12)
- Kafka

## Development

1. Install dependencies using `npm install` on the root directory
2. Run `docker-compose up` on the root directory
3. Prepare database using the directions in `packages/subscription`

## Deployment

Public:

- has `/metrics` endpoint where it exposes certain memory and cpu consumption metrics for Prometheus support.
- has `/health` endpoint for readiness and liveliness probe checks.

GRPC microservices:

- supports `grpc.health.v1.Health` grpc health checks

For further information regarding Kubernets deployment, please look into the k8s folder.

### Security

- inter microservice communication

  - In general all communications between microservices should be encrypted, preferably using SSL. Right now, all of the requests are signed but have insecure SSL configuration.

- All microservices hide stacktraces and error messages from client by default.

- _Rate limiting_ is enabled on public microservice. the default configuration is max 100 requests per minute.

  - Right now we're using memory based rate limiting which is bad for production since it will reset on deployment, and work be suitable if you have scale to more than 1 horizontal pods.
  - Exposes `x-ratelimit-limit`, `x-ratelimit-remaining`, `x-ratelimit-reset` and `retry-after` headers to client.

- _CORS configuration_: Before using this code on production make sure that the necessary CORS headers should only allow requests from your owned domains to disallow unwanted requests from browsers and websites.

### OpenAPI 3 Specification

You can access OpenAPI 3 based documentation generated by `public` microservice using `docs` next.js project which consumes the OpenAPI specification and creates a developer friendly website.

### Privacy Issues

- Subscription microservice is not GDPR friendly. We shouldn't store any personal information unless we particularly need it. Since some of the issues regarding personal information was inside the task itself, I left it there, but in order comply with the regulations, I didn't soft delete a subscription but removed it completely upon cancellation.

### Development Issues

- Lerna npmClientArgs does not work for Node 15 & NPM 7. Please refer to https://github.com/n8n-io/n8n/issues/1149. In order to solve installation issues you need to run `npm config set legacy-peer-deps true`. By default using `npm install` triggers `prepare-build.js` command which handles this error.

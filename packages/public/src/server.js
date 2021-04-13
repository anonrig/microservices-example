import f from 'fastify'

import pressure from 'under-pressure'
import compress from 'fastify-compress'
import helmet from 'fastify-helmet'
import sensible from 'fastify-sensible'
import metrics from 'fastify-metrics'
import rateLimiting from 'fastify-rate-limit'
import swagger from 'fastify-swagger'

import grpcjs from '@grpc/grpc-js'

import Logger from './logger.js'
import routes from './routes/index.js'

export async function build() {
  const logger = Logger.create().withScope('server')

  const server = f({
    trustProxy: true,
    disableRequestLogging: true,
    logger: false,
    ajv: {
      customOptions: { jsonPointers: true },
    },
  })

  // customize error handler to distinguish grpc, internal and http errors
  server.setErrorHandler(async (error) => {
    if (error.code) {
      // Handle grpc related error codes.
      switch (error.code) {
        case grpcjs.status.NOT_FOUND:
          throw server.httpErrors.notFound(error.message)
        case grpcjs.status.PERMISSION_DENIED:
          throw server.httpErrors.unauthorized(error.message)
        case grpcjs.status.RESOURCE_EXHAUSTED:
          throw server.httpErrors.serviceUnavailable(error.message)
        default:
          logger.withTag('setErrorHandler').fatal(error)
          throw server.httpErrors.internalServerError('Something went wrong')
      }
    } else if (error.statusCode) {
      // don't log any custom errors, since it's handled
      throw error
    } else if (error.validation) {
      // Handle validation errors
      throw error
    } else {
      // Handle uncaught errors due to runtime issues
      logger.withTag('setErrorHandler').error(error)
      throw server.httpErrors.internalServerError('Something went wrong')
    }
  })

  server.register(swagger, {
    routePrefix: '/docs',
    openapi: {
      info: {
        title: 'Subscription Public API',
        description: 'Subscriptions API documentation',
        version: '0.1.0',
        contact: {
          name: 'Yagiz Nizipli',
          url: 'https://yagiz.co',
          email: 'yagiz@nizipli.com',
        },
      },
    },
    uiConfig: {
      deepLinking: true,
      showCommonExtensions: true,
      tryItOutEnabled: false,
    },
    exposeRoute: true,
  })

  server.register(rateLimiting, { max: 100, timeWindow: '1 minute' })

  server.register(pressure, {
    exposeStatusRoute: {
      routeOpts: {
        logLevel: 'debug',
      },
      routeSchemaOpts: {
        hide: true,
      },
      url: '/health',
    },
    healthCheck: async function () {
      return true
    },
    healthCheckInterval: 60000,
  })

  server.register(sensible, {
    errorHandler: false,
  })

  server.register(compress)
  server.register(helmet)

  // make sure that you've disabled metrics from k8s configuration
  if (process.env.NODE_ENV === 'production') {
    server.register(metrics, { endpoint: '/metrics' })
  }
  server.register(routes, { prefix: '/v1' })

  return server
}

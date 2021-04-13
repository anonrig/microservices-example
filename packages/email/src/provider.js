import logger from './logger.js'

export async function sendEmail({ to, body, title }) {
  logger
    .withScope('provider')
    .withTag('sendEmail')
    .success(`Successfully sent an email to ${to}`)
}

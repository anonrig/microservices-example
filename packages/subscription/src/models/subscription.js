import grpc from '@grpc/grpc-js'
import dayjs from 'dayjs'
import pg from '../pg.js'

export async function findAll({
  gender,
  consent_flag,
  date_of_birth,
  newsletter_id,
}) {
  return pg
    .queryBuilder()
    .select('*')
    .from('subscriptions')
    .where(function () {
      if (gender) {
        this.where({ gender })
      }

      if (typeof consent_flag !== 'undefined') {
        this.andWhere({ consent_flag })
      }

      if (date_of_birth) {
        this.andWhere({
          date_of_birth: dayjs(date_of_birth).format('YYYY-MM-DD'),
        })
      }

      if (newsletter_id) {
        this.andWhere({ newsletter_id })
      }
    })
}

export async function findOne({ subscription_id }) {
  const subscription = await pg
    .queryBuilder()
    .select('*')
    .from('subscriptions')
    .where({ subscription_id })
    .first()

  if (!subscription) {
    const error = new Error(`Subscription not found`)
    error.code = grpc.status.NOT_FOUND
    throw error
  }

  return subscription
}

export async function create({
  subscription_id,
  email,
  first_name,
  gender,
  date_of_birth,
  consent_flag,
  newsletter_id,
}) {
  await pg
    .queryBuilder()
    .insert({
      subscription_id,
      email,
      first_name,
      gender,
      date_of_birth: dayjs(date_of_birth),
      consent_flag,
      newsletter_id,
    })
    .into('subscriptions')
    .onConflict(['email', 'newsletter_id'])
    .merge()

  return pg
    .queryBuilder()
    .select('subscription_id')
    .from('subscriptions')
    .where({ email, newsletter_id })
    .first()
}

export async function cancel({ subscription_id }) {
  return pg.transaction(async (trx) => {
    const subscription = await pg
      .queryBuilder()
      .select('*')
      .from('subscriptions')
      .where({ subscription_id })
      .transacting(trx)
      .forUpdate()
      .first()

    if (!subscription) {
      const error = new Error(`Subscription not found`)
      error.code = grpc.status.NOT_FOUND
      throw error
    }

    await pg
      .queryBuilder()
      .delete()
      .from('subscriptions')
      .where({ subscription_id })
      .transacting(trx)

    return { subscription_id }
  })
}

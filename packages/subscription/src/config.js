const { PORT, EMAIL_URL } = process.env

export const port = PORT ?? 3001
export const emailUrl = EMAIL_URL ?? '0.0.0.0:3002'

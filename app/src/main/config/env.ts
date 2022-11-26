export const env = {
  serverPort: process.env.SERVER_PORT ?? 3000,
  serverHost: process.env.SERVER_HOST ?? '0.0.0.0',

  dbName: process.env.DB_NAME ?? '',
  dbUserName: process.env.DB_USER_NAME ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbPort: process.env.DB_PORT ?? 3306,
  dbHost: process.env.DB_HOST ?? ''
}

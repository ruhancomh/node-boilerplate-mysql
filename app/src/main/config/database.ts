import { Sequelize } from 'sequelize'
import { env } from './env'

export const db = new Sequelize(env.dbName, env.dbUserName, env.dbPassword, {
  dialect: 'mysql',
  host: env.dbHost,
  port: env.dbPort,
  logging: console.debug
})

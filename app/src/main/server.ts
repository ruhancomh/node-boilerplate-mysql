import app from './config/app'
import { env } from './config/env'

app.listen(
  env.serverPort,
  env.serverHost,
  () => console.log(`Server runnning at http://${env.serverHost}:${env.serverPort}`)
)

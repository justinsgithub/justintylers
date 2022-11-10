import express from 'express'
import { connect_to_database } from './services/database'
import { writings_router } from './routes/writings'
import { hello_router } from './routes/hello'

export const app = express()
app.use('/hello', hello_router)
app.use('/writings', writings_router)

if (require.main === module) {
  const port = 3001
  connect_to_database()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`)
      })
    })
    .catch((error: Error) => {
      console.error('Database connection failed', error)
      process.exit()
    })
}

module.exports = app

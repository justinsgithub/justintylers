import * as express from 'express'
export const hello_router = express.Router()

hello_router.get('/', (_req, res) => {
  res.end('Hello world!')
})

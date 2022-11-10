// External Dependencies
import { readFile } from 'fs'
import * as express from 'express'
import { PrismaClient } from '@prisma/client'
import { collections } from '../services/database'

// Global Config
const prisma = new PrismaClient()

export const writings_router = express.Router()

writings_router.use(express.json())

// GET
writings_router.get('/', async (_req, res) => {
  try {
    const writings = (await collections.writings?.find({})?.toArray()) || []
    /* const test = prisma.writing. */

    res.status(200).send(writings)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

writings_router.get('/:slug', async (req, res) => {
  const slug = req?.params?.slug

  try {
    const query = { slug }
    const writing = await collections.writings?.findOne(query)
    if (writing) {
      res.status(200).send(writing)
    } else {
      const file = process.cwd() + '/content/writings/' + slug + '.md'

      readFile(file, (error, buffer) => {
        if (error) {
          console.log(error)
          return res.status(404).send(`Unable to find writing: ${slug}`)
        }
        if (buffer) {
          console.log(buffer)
          console.log(buffer.toString())
        }
        res.status(404).send(`Unable to find writing: ${slug}`)
      })
    }
  } catch (error) {
    console.log(error)
    res.status(404).send(`Unable to find writing: ${slug}`)
  }
})

// POST

// PUT

// DELETE

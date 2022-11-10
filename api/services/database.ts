import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'
import { Writing } from '../models/writing'

export const collections: { writings?: mongoDB.Collection<Writing> } = {}

export async function connect_to_database() {
  dotenv.config()

  if (!process.env.DB_CONN_STRING || !process.env.WRITINGS_COLLECTION_NAME) return

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING)

  await client.connect()

  const db = client.db(process.env.SITE_DB_NAME)

  const writing_collection = db.collection<Writing>(process.env.WRITINGS_COLLECTION_NAME)

  collections.writings = writing_collection

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${writing_collection.collectionName}`)
}

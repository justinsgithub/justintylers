import fs from 'fs'
import { join } from 'path'
import { MongoClient } from 'mongodb'

const posts_directory = join(process.cwd(), 'content/writings')

const writing_slugs = fs.readdirSync(posts_directory).map(slug => slug.replace(/\.md$/, ''))

console.log(writing_slugs)

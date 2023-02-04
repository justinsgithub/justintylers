import { join } from 'path'
import fs from 'fs'

const posts_directory = join(process.cwd(), 'content/writings')

const get_filenames = () => {
  return fs.readdirSync(posts_directory)
}

const insert_date = (filename: string) => {
  const full_path = join(posts_directory, filename)
  const file_contents = fs.readFileSync(full_path, 'utf8')
  const split_contents = file_contents.split('\n')
  const position = 3
  split_contents.splice(position - 1, 0, 'date: 2021')
  const new_contents = split_contents.join('\n')
  fs.writeFileSync(full_path, new_contents, { encoding: 'utf8' })
}

const insert_dates = () => {
  const filenames = get_filenames()
  filenames.forEach((filename) => {
    insert_date(filename)
  })
  /*   const writing_slugs = get_all_writings(['slug']).map((writing) => writing.slug) */
  /*   const db_writings = await prisma.writing.findMany() */
  /*   const db_slugs = db_writings.map((writing) => writing.slug) */
  /*   const insert_these = writing_slugs.filter((slug) => typeof slug === 'string' && !db_slugs.includes(slug)) as string[] */
  /*   console.log('INSERTING', insert_these) */
  /*   if (insert_these.length > 0) { */
  /*     const formatted = insert_these.map((slug) => { */
  /*       return { slug } */
  /*     }) */
  /*     await prisma.writing.createMany({ data: formatted }) */
  /*   } */
}

/* insert_dates() */

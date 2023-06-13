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
  return new_contents
  /* fs.writeFileSync(full_path, new_contents, { encoding: 'utf8' }) */
}

const insert_dates = () => {
  const filenames = get_filenames()
  filenames.forEach((filename) => {
    insert_date(filename)
  })
}

insert_dates()

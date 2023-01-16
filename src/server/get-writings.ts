import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const posts_directory = join(process.cwd(), 'content/writings')

export const get_writing_slugs = () => {
  return fs.readdirSync(posts_directory)
}

export const get_writing_by_slug = (slug: string, fields: string[] = []) => {
  const real_slug = slug.replace(/\.md$/, '')
  const full_path = join(posts_directory, `${real_slug}.md`)
  const file_contents = fs.readFileSync(full_path, 'utf8')
  const { data, content, excerpt } = matter(file_contents, {excerpt: true})

  const preview = excerpt?.split('\n').filter((i) => i !== '') || ['']


  type Items = {
    [key: string]: string | string[],
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'preview') {
      items[field] = preview
    }
    if (excerpt && field === 'excerpt') {
      items[field] = excerpt
    }
    if (field === 'slug') {
      items[field] = real_slug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export const get_all_writings = (fields: string[] = []) => {
  const slugs = get_writing_slugs()
  const posts = slugs.map((slug) => get_writing_by_slug(slug, fields))
    // sort posts by date in descending order
    /* .sort((post1, post2) => (post1.date > post2.date ? -1 : 1)) */
  return posts
}


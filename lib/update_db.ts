import { prisma } from '@/server/db'
import { get_all_writings } from '@/server/get-writings'

const update_writings = async () => {
  const writing_slugs = get_all_writings(['slug']).map((writing) => writing.slug)
  const db_writings = await prisma.writing.findMany()
  const db_slugs = db_writings.map((writing) => writing.slug)
  const insert_these = writing_slugs.filter((slug) => typeof slug === 'string' && !db_slugs.includes(slug)) as string[]
  /* console.log('INSERTING', insert_these) */
  if (insert_these.length > 0) {
    const formatted = insert_these.map((slug) => {
      return { slug }
    })
    await prisma.writing.createMany({ data: formatted })
  }
}

update_writings()

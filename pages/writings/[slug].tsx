import type { NextPage, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { get_all_writings, get_writing_by_slug } from '@/server/get-writings'
import { markdown_to_html } from '@/server/markdown_html'
import { Writing } from '@/components/writings/slug'

export const getStaticPaths: GetStaticPaths = async () => {

    const writing_slugs = get_all_writings(['slug']).map((writing) => writing.slug)
    return {
      paths: writing_slugs.map((slug) => {
        return {
          params: {
            slug
          }
        }
      }),
      fallback: false
    }
  }

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
  const slug = context.params?.slug as string
  const writing = get_writing_by_slug(slug, ['title', 'slug', 'content'])
  const title = writing.title as string
  const writing_content = writing.content as string
  const content = await markdown_to_html(writing_content || '')
  return {
    props: {
      writing: {
        content,
        slug,
        title
      }
    }
  }
}

const WritingPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <Writing writing={props.writing} />
  )
}

export default WritingPage

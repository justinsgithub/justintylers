import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/layout'
import { get_all_writings, get_writing_by_slug } from '@/utils/get-writings'
import { markdown_to_html } from '@/utils/markdown_html'
import { IWriting } from '@/types/writing'
import markdown_styles from '@/styles/markdown.module.css'
import { useSession } from 'next-auth/react'

type Params = {
  params: {
    slug: string
  }
}

export const getStaticPaths = async () => {
  const posts = get_all_writings(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const writing = get_writing_by_slug(params.slug, [
    'title',
    /* 'date', */
    'slug',
    /* 'author', */
    'content',
    /* 'ogImage', */
    /* 'coverImage', */
  ])

  const writing_content = writing.content as string

  const content = await markdown_to_html(writing_content || '')

  return {
    props: {
      writing: {
        ...writing,
        content,
      },
    },
  }
}

interface IProps {
  writing: IWriting
}

const WritingPage: NextPage<IProps> = (props) => {
  const router = useRouter()

  const session = useSession()

  if (!router.isFallback && !props.writing?.slug) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <div className='relative flex-1 py-8'>
          <div className='mb-6 px-4 lg:px-8'>
            <div className='text-4xl font-bold capitalize'>
              {props.writing.title}
            </div>
          </div>
          <div>
            <section className='mb-6 px-4 lg:px-8'>
                <article className={markdown_styles['markdown']} dangerouslySetInnerHTML={{__html: props.writing.content}}/>
            </section>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default WritingPage

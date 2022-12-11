import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { NextPage, GetStaticPaths, GetServerSideProps, GetStaticPropsContext, InferGetStaticPropsType  } from 'next'
import { prisma } from '@/server/db/client'
import superjson from 'superjson';
import { appRouter } from '@/server/trpc/router/_app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/layout'
import { get_all_writings, get_writing_by_slug } from '@/utils/get-writings'
import { markdown_to_html } from '@/utils/markdown_html'
import { type IWriting } from '@/types/writing'
import markdown_styles from '@/styles/markdown.module.css'
import { useSession } from 'next-auth/react'
import { createContextInner } from '@/server/trpc/context'
import { trpc } from '@/utils/trpc';

type Params = {
  params: {
    slug: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
  const session = null
  const req = null
  const res = null

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma, session, req, res
    },
    transformer: superjson
  })

  const slug = context.params?.slug as string;
  

  const writing = get_writing_by_slug(slug, [
    'title',
    'id',
    /* 'date', */
    'slug',
    /* 'author', */
    'content',
    /* 'ogImage', */
    /* 'coverImage', */
  ])
  
  const { id, title } = writing

  const writing_content = writing.content as string

  const content = await markdown_to_html(writing_content || '')

  const test = await ssg.writing.by_slug.prefetch({slug})

  console.log('SSG WRITING', test)

  console.log('SLUG', slug)

  /* await ssg..ctx.prisma.writing.byId.prefetch({ id }); */

  return {
    props: {
      writing: {
        content,
        id,
        slug,
        title,
      },
    },
  }
}

const WritingPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter()

  const session = useSession()

  const slug = props.writing.slug
  /* const writing_query = trpc.post.byId.useQuery({ id }); */
  const writing_query = trpc.writing.by_slug.useQuery({ slug })

  if (writing_query.status !== 'success') {
    // won't happen since if using `fallback: "blocking"`
    return <Layout><h1>Loading...</h1></Layout>
  }

  const { data } = writing_query

  if (!props.writing?.slug) {
    return <ErrorPage statusCode={404} />
  }

  console.log('CLIENT DATA', data)

  return (
    <Layout>
      {router?.isFallback ? (
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

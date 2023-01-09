import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { NextPage, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { prisma } from '@/server/db/client'
import { Guest, User } from '@prisma/client'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import superjson from 'superjson'
import { appRouter } from '@/server/trpc/router/_app'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/layout'
import { get_all_writings, get_writing_by_slug } from '@/utils/get-writings'
import { markdown_to_html } from '@/utils/markdown_html'
import markdown_styles from '@/styles/markdown.module.css'
import { useSession } from 'next-auth/react'
import { trpc } from '@/utils/trpc'
import { Card, IconButton, Stack } from '@mui/material'
import { Comment, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = get_all_writings(['slug'])
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug
                }
            }
        }),
        fallback: false
    }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ slug: string }>) => {
    const session = null
    const req = null
    const res = null
    const ssg = createProxySSGHelpers({ router: appRouter, ctx: { prisma, session, req, res }, transformer: superjson })
    const slug = context.params?.slug as string
    const writing = get_writing_by_slug(slug, ['title', 'slug', 'content'])
    const { title } = writing
    const writing_content = writing.content as string
    const content = await markdown_to_html(writing_content || '')
    await ssg.writing.by_slug.prefetch({ slug })
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
    const router = useRouter()
    const session = useSession()
    const [user, setUser] = useState<User | Guest>()
    const like_mutate = trpc.writing.like.useMutation()
    const writing_query = trpc.writing.by_slug.useQuery({ slug: props.writing.slug })
    const writing_data = writing_query?.data
    const liked_writing = writing_data?.writing_likes?.find((like) => like.user_id === user?.id)

    useEffect(() => {
        const is_user = session?.data?.user
        const is_guest = localStorage.getItem('guest')
        if (is_user && user?.id !== is_user?.id) {
            setUser(is_user)
        } else if (!is_user && is_guest) {
            setUser(JSON.parse(is_guest))
        } else if (!is_user && !is_guest) {
            axios.post('/api/guest/create').then((response) => {
                setUser(response.data)
                localStorage.setItem('guest', JSON.stringify(response.data))
            })
        }
    }, [session])

    if (!props.writing?.slug) return <ErrorPage statusCode={404} />

    if (writing_query.status !== 'success')
        return (
            <Layout>
                {' '}
                <h1>Loading...</h1>{' '}
            </Layout>
        )

    console.log('WRITING DATA', writing_data)

    const like_writing = () => {
        console.log('LIKING 1')
        if (user && writing_data) {
            like_mutate.mutateAsync({ user_id: user.id, writing_id: writing_data.id })
            console.log('LIKING 2')
        }
    }

    return (
        <Layout>
            {router?.isFallback ? (
                <h1>Loading...</h1>
            ) : (
                <Box mx={2} width='auto'>
                    <Box width='fit-content' m='0 auto' mb={1}>
                        <Typography variant='h3' component='h1' mt={5} textAlign='center'>
                            {props.writing.title}
                        </Typography>
                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={2} mt={1}>
                            {liked_writing ? (
                                <IconButton color='primary' onClick={() => like_writing()}>
                                    <ThumbUpAlt fontSize='medium' />
                                </IconButton>
                            ) : (
                                <IconButton onClick={() => like_writing()}>
                                    <ThumbUpOffAlt fontSize='medium' />
                                </IconButton>
                            )}
                            <IconButton>
                                <Comment fontSize='medium' />
                            </IconButton>
                        </Stack>
                    </Box>
                    <Card variant='outlined' sx={{ width: 'fit-content', px: 1.5, margin: '0 auto' }}>
                        <section>
                            <article className={markdown_styles['markdown']} dangerouslySetInnerHTML={{ __html: props.writing.content }} />
                        </section>
                    </Card>
                </Box>
            )}
        </Layout>
    )
}

export default WritingPage

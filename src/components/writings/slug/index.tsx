import { type Guest } from '@prisma/client'
import { type User } from 'next-auth'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/shared/layout'
import markdown_styles from '@/styles/markdown.module.css'
import { useSession } from 'next-auth/react'
import { api } from '@/client/api'
import { Card, IconButton, Stack } from '@mui/material'
import { Comment, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { type FC, useEffect, useState } from 'react'

interface IWritingProps {
  writing: {
    content: string
    slug: string
    title: string
  }
}

export const Writing: FC<IWritingProps> = (props) => {
  const router = useRouter()
  /* const session = useSession() */
  const user_query = api.user.get_user_id.useQuery()
  const writing_query = api.writing.by_slug.useQuery({ slug: props.writing.slug })
  const like_mutate = api.writing.like.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })
  const unlike_mutate = api.writing.unlike.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })
  const user_id = user_query?.data
  /* const [user, setUser] = useState<User | Guest>() */
  const [liked, set_liked] = useState(() => {
    if (writing_query?.data) {
      return writing_query?.data?.writing_likes?.length > 0
    }
    return false
  })

  if (!props.writing?.slug) return <ErrorPage statusCode={404} />

  // prettier-ignore
  const disable_like = !user_id || !writing_query?.data || writing_query.isRefetching || like_mutate.isLoading || unlike_mutate.isLoading

  const like_writing = () => {
    if (disable_like) {
      return
    }
    set_liked(true) // Optimistic Update
    try {
      like_mutate.mutateAsync({ writing_id: writing_query?.data?.id || '' })
    } catch {
      return
    }
  }

  const unlike_writing = () => {
    if (disable_like) {
      return
    }
    set_liked(false) // Optimistic Update
    try {
      unlike_mutate.mutateAsync({writing_id: writing_query?.data?.id || ''})
    } catch {
      return
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
              {liked ? (
                <IconButton color='primary' onClick={() => unlike_writing()}>
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

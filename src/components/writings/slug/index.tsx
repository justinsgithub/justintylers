import { useState, type FC } from 'react'
import { api } from '@/client/api'
import { useForm } from 'react-hook-form-mui'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/shared/layout'
import markdown_styles from '@/styles/markdown.module.css'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Comment from '@mui/icons-material/CommentOutlined'
import { Like } from './like'
import { Comments } from './comments'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { signOut, signIn, useSession } from "next-auth/react"
import { Button } from '@mui/material'


interface IWritingProps {
  writing: {
    content: string
    slug: string
    title: string
  }
}

interface IFormValues {
  comment: string
}

export const Writing: FC<IWritingProps> = (props) => {
  const router = useRouter()

  const session = useSession()

  const writing_query = api.writing.by_slug.useQuery({ slug: props.writing.slug })

  const query_data = writing_query?.data

  console.log('WRITING_QUERY', query_data)

  const [comments_open, set_comments_open] = useState(false)

  const form_context = useForm<IFormValues>()

  if (!props.writing?.slug) return <ErrorPage statusCode={404} />

  const close_comments = () => {
    form_context.clearErrors()
    set_comments_open(false)
  }

  return (
    <Layout>
      {router?.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Drawer anchor='right' open={comments_open} onClose={close_comments}>
          {writing_query?.data?.writing && <Comments writing_query={writing_query} form_context={form_context} />}
          </Drawer>
          <Box mx={2} width='auto'>
            <Box width='fit-content' m='0 auto' mb={1}>
                <Button onClick={() => signIn()}>
                  Sign In {JSON.stringify(session?.data)}
                </Button>
              <Typography variant='h3' component='h1' mt={5} textAlign='center'>
                {props.writing.title}
              </Typography>
                <Button onClick={() => signOut()}>
                  Sign Out {JSON.stringify(session?.data)}
                </Button>
              <Typography variant='h3' component='h1' mt={5} textAlign='center'>
                {query_data?.username}
              </Typography>
              <Stack direction='row' alignItems='center' justifyContent='center' spacing={2} mt={1}>
                <Like writing_query={writing_query} />
                <Tooltip title='Open Comments'>
                  <IconButton onClick={() => set_comments_open(true)}>
                    <Comment color='primary' fontSize='medium' />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            <Card variant='outlined' sx={{ width: 'fit-content', px: 1.5, margin: '0 auto' }}>
              <section>
                <article className={markdown_styles['markdown']} dangerouslySetInnerHTML={{ __html: props.writing.content }} />
              </section>
            </Card>
          </Box>
        </>
      )}
    </Layout>
  )
}

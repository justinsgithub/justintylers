import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Layout } from '@/components/shared/layout'
import markdown_styles from '@/styles/markdown.module.css'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Comment from '@mui/icons-material/Comment'
import { useState, type FC } from 'react'
import { Like } from './like'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

interface IWritingProps {
  writing: {
    content: string
    slug: string
    title: string
  }
}

export const Writing: FC<IWritingProps> = (props) => {
  const router = useRouter()

  const [comments_open, set_comments_open] = useState(false)

  if (!props.writing?.slug) return <ErrorPage statusCode={404} />

  const open_comments = () => {
    console.log('opening comments')
  }

  return (
    <Layout>
      {router?.isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Drawer anchor='right' open={comments_open} onClose={() => set_comments_open(false)}>
            <Box sx={{ width: 350 }} role='presentation'>
              <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
                <ListItem alignItems='flex-start'>
                  <ListItemText primary='Guest 48292' secondary='Awesome writing, really inspired me' />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                    <ListItemText primary='Guest 30854' secondary={"Great writing, super relatable, thank you for posting these"} />
                </ListItem>
                <Divider variant='inset' component='li' />
                <ListItem alignItems='flex-start'>
                  <ListItemText primary='Guest 30942' secondary={'Awesome content, thank you for all the value, just subscribed to become a member yesterday'} />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box mx={2} width='auto'>
            <Box width='fit-content' m='0 auto' mb={1}>
              <Typography variant='h3' component='h1' mt={5} textAlign='center'>
                {props.writing.title}
              </Typography>
              <Stack direction='row' alignItems='center' justifyContent='center' spacing={2} mt={1}>
                <Like slug={props.writing.slug} />
                <IconButton onClick={() => set_comments_open(true)}>
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
        </>
      )}
    </Layout>
  )
}

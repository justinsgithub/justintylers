import { useEffect, useState, type FC } from 'react'
import { api } from '@/client/api'
import { Comment } from '@prisma/client'
import { type FieldError, FormContainer, type SubmitHandler, TextFieldElement, useForm } from 'react-hook-form-mui'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import Tooltip from '@mui/material/Tooltip'

interface IComments {
  writing_query: any
}

interface IFormValues {
  comment: string
}

interface IComment {
  body: string
  author: string
}

const Comment: FC<IComment> = (props) => {
  return (
    <>
      <ListItem alignItems='flex-start' secondaryAction={
          <Tooltip title='Like Comment'>
            <IconButton edge='end' aria-label='like' onClick={() => console.log('LIKING COMMENT')}>
              <ThumbUpOffAlt color='primary' fontSize='small' />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemText primary={props.author} secondary={props.body} />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  )
}

export const Comments: FC<IComments> = (props) => {
  /* const writing_query = props.writing_query */
  const writing_query = api.writing.by_slug.useQuery({ slug: '1-am' })

  const comment_mutate = api.writing.comment.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })

  const form_context = useForm<IFormValues>()

  const [user_comment, set_user_comment] = useState<Omit<Comment, 'content_id'>>()

  const [comments, set_comments] = useState<Omit<Comment, 'content_id'>[]>()

  if (!writing_query?.data?.writing) return null

  const writing = writing_query.data.writing

  const _user_comment = writing_query.data.user_comment

  const _comments = writing.comments

  useEffect(() => {
    set_comments(_comments.filter((comment) => comment.user_id !== _user_comment?.user_id))
  }, [_comments])

  useEffect(() => {
    set_user_comment(_user_comment)
  }, [_user_comment])

  console.log('COMMENTS', comments)

  console.log('USER COMMENT', user_comment)

  const comment_val = {
    required: true,
    min: 5
  }

  const disable_comment = writing_query.isRefetching || comment_mutate.isLoading

  const submit: SubmitHandler<IFormValues> = (values) => {
    console.log('Submitting', values)
    console.log(form_context)
    if (!writing_query.data.user_comment && !disable_comment) {
      set_user_comment({ body: values.comment, id: 'temp00', created_at: new Date(Date.now()), user_id: '' })
      try {
        comment_mutate.mutateAsync({ content_type: 'writing', content_id: writing.id, body: values.comment })
      } catch (err) {
        throw err
      }
    }
    form_context.reset()
  }

  const handle_error = (_err: FieldError) => {
    return 'Must be at least 5 characters'
  }

  const delete_comment = () => {
    console.log('DELETE COMMENT')
    if (writing_query.data.user_comment && !disable_comment) {
      set_user_comment(undefined) // optimistic update
      try {
        comment_mutate.mutateAsync({ content_type: 'writing', content_id: writing.id, body: 'delete_comment' })
      } catch (err) {
        throw err
      }
    }
  }

  return (
    <Box sx={{ width: 350 }} role='presentation'>
      <FormContainer onSuccess={submit} formContext={form_context}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {user_comment ? (
            <>
              <ListItem
                alignItems='flex-start'
                secondaryAction={
                  <Tooltip title='Delete Comment'>
                    <IconButton edge='end' aria-label='delete' onClick={() => delete_comment()}>
                      <DeleteIcon color='error' fontSize='small' />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={`Guest ${user_comment.user_id.slice(user_comment.user_id.length - 5)} ( you )`}
                  secondary={user_comment.body}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </>
          ) : (
            <ListItem alignItems='flex-start' disableGutters sx={{ pl: 1, pr: 0.5 }}>
              <TextFieldElement
                parseError={handle_error}
                name='comment'
                label='leave a comment'
                multiline
                size='small'
                fullWidth
                validation={comment_val}
              />
              <Tooltip title='Submit Comment'>
                <IconButton type='submit' aria-label='submit comment'>
                  <SendIcon color='primary' />
                </IconButton>
              </Tooltip>
            </ListItem>
          )}
          {comments &&
            comments.map((comment) => (
              <Comment key={comment.id} author={`Guest ${comment.user_id.slice(comment.user_id.length - 5)}`} body={comment.body} />
            ))}
        </List>
      </FormContainer>
    </Box>
  )
}

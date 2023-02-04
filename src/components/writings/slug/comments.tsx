import { useEffect, useState, type FC } from 'react'
import { api } from '@/client/api'
import type { Comment as _Comment } from '@prisma/client'
import { Comment, IComment } from './comment'
import { type FieldError, FormContainer, type SubmitHandler, TextFieldElement, UseFormReturn } from 'react-hook-form-mui'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'
import Tooltip from '@mui/material/Tooltip'

interface IFormValues {
  comment: string
}

interface IComments {
  writing_query: any
  form_context: UseFormReturn<IFormValues, any>
}

export const Comments: FC<IComments> = (props) => {
  const writing_query = props.writing_query
  /* const writing_query = api.writing.by_slug.useQuery({ slug: '1-am' }) */

  const comment_mutate = api.writing.comment.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })
  const like_mutate = api.writing.like_comment.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })

  const form_context = props.form_context

  const [user_comment, set_user_comment] = useState<Omit<_Comment, 'writing_id'>>()

  const [comments, set_comments] = useState<IComment[]>()

  const [replying, _set_replying] = useState('')

  const writing = writing_query.data.writing

  const _user_comment = writing_query.data.user_comment

  const _comments = writing.comments

  const set_replying = (id: string) => {
    _set_replying(id)
  }

  useEffect(() => {
    set_comments(_comments.filter((comment: _Comment) => comment.user_id !== _user_comment?.user_id))
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
        comment_mutate.mutateAsync({ writing_id: writing.id, body: values.comment, action: 'create' })
      } catch (err) {
        console.log(err)
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
        comment_mutate.mutateAsync({ writing_id: writing.id })
      } catch (err) {
        throw err
      }
    }
  }

  const like_comment = (like: boolean, comment_id: string) => {
    if (like) {
      return like_mutate.mutateAsync({ comment_id, action: 'create' })
    } else {
      return like_mutate.mutateAsync({ comment_id, action: 'delete' })
    }
  }

  const UserComment = user_comment ? (
    <>
      <ListItem
        alignItems='flex-start'
        secondaryAction={
          <Tooltip title='Delete Comment'>
            <IconButton edge='end' aria-label='delete' onClick={() => delete_comment()}>
              <DeleteIcon color='secondary' fontSize='small' />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemText primary={writing_query?.data?.username + ' ( you )'} secondary={user_comment.body} />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  ) : (
    <FormContainer onSuccess={submit} formContext={form_context}>
      <ListItem alignItems='flex-start' disableGutters sx={{ pl: 1, pr: 0.5, mb: 2 }}>
        {/* prettier-ignore */}
        <TextFieldElement parseError={handle_error} name='comment' placeholder='leave a comment' multiline size='small' fullWidth validation={comment_val} />
        <Tooltip title='Submit Comment'>
          <IconButton type='submit' aria-label='submit comment'>
            <SendIcon color='primary' />
          </IconButton>
        </Tooltip>
      </ListItem>
    </FormContainer>
  )

  return (
    <Box sx={{ width: 350 }} role='presentation'>
      <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
        {UserComment}
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                replying={replying}
                set_replying={set_replying}
                comment={comment}
                user_id={writing_query.data.user_id}
                like_comment={like_comment}
              />
            )
          })}
      </List>
    </Box>
  )
}

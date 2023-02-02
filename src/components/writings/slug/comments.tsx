import { useEffect, useState, type FC } from 'react'
import { api } from '@/client/api'
import { Comment, Like } from '@prisma/client'
import { type FieldError, FormContainer, type SubmitHandler, TextFieldElement, UseFormReturn } from 'react-hook-form-mui'
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

type LikeComment = (like: boolean, comment_id: string) => Promise<Like>

interface IFormValues {
  comment: string
}

interface IComment {
  likes: Like[]
  created_at: Date
  id: string
  user_id: string
  children: Comment[]
  body: string
}

interface ICommentProps {
  comment: IComment
  user_id: string
  like_comment: LikeComment
}

const Comment: FC<ICommentProps> = (props) => {
  const comment = props.comment
  const like_comment = props.like_comment
  const author = `Guest ${comment.user_id.slice(comment.user_id.length - 5)}`
  const liked_comment = comment.likes.find((like) => like.user_id === props.user_id)
  const [liked, set_liked] = useState(liked_comment ? true : false)
  const [disable_like, set_disable_like] = useState(false)

  // hacky but works for now
  useEffect(() => {
    setTimeout(() => {
      set_disable_like(false)
    }, 3000)
  }, [disable_like])

  const handle_click = (like: boolean) => {
    if (disable_like) return
    set_disable_like(true)
    if (like) {
      set_liked(like) // Optimistic Update
      try {
        like_comment(like, comment.id)
        /* like_mutate.mutateAsync({ writing_id: writing_query?.data?.writing?.id || '', action: 'create' }) */
      } catch {
        return
      }
    } else {
      set_liked(like) // Optimistic Update
      try {
        like_comment(like, comment.id)
        /* like_mutate.mutateAsync({ writing_id: writing_query?.data?.writing?.id || '', action: 'delete' }) */
      } catch (err) {
        throw err
      }
    }
  }

  const sec_action = liked ? (
    <Tooltip title='Unlike Comment'>
      <IconButton edge='end' aria-label='unlike' onClick={() => handle_click(false)}>
        <ThumbUpAlt color='primary' fontSize='small' />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title='Like Comment'>
      <IconButton edge='end' aria-label='like' onClick={() => handle_click(true)}>
        <ThumbUpOffAlt fontSize='small' />
      </IconButton>
    </Tooltip>
  )

  return (
    <>
      {/*prettier-ignore*/}
      <ListItem alignItems='flex-start' secondaryAction={sec_action}>
        <ListItemText primary={author} secondary={comment.body} />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  )
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

  const [user_comment, set_user_comment] = useState<Omit<Comment, 'writing_id'>>()

  const [comments, set_comments] = useState<IComment[]>()

  const writing = writing_query.data.writing

  const _user_comment = writing_query.data.user_comment

  const _comments = writing.comments

  useEffect(() => {
    set_comments(_comments.filter((comment: Comment) => comment.user_id !== _user_comment?.user_id))
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
        comment_mutate.mutateAsync({ writing_id: writing.id, body: 'delete_comment', action: 'delete' })
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
              <DeleteIcon color='error' fontSize='small' />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemText primary={writing_query?.data?.username} secondary={user_comment.body} />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  ) : (
    <ListItem alignItems='flex-start' disableGutters sx={{ pl: 1, pr: 0.5 }}>
      {/* prettier-ignore */}
      <TextFieldElement parseError={handle_error} name='comment' label='leave a comment' multiline size='small' fullWidth validation={comment_val} />
      <Tooltip title='Submit Comment'>
        <IconButton type='submit' aria-label='submit comment'>
          <SendIcon color='primary' />
        </IconButton>
      </Tooltip>
    </ListItem>
  )

  return (
    <Box sx={{ width: 350 }} role='presentation'>
      <FormContainer onSuccess={submit} formContext={form_context}>
        <List sx={{ width: '100%', maxWidth: 350, bgcolor: 'background.paper' }}>
          {UserComment}
          {comments &&
            comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} user_id={writing_query.data.user_id} like_comment={like_comment} />
            })}
        </List>
      </FormContainer>
    </Box>
  )
}

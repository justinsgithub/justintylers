import { useEffect, useState, type FC } from 'react'
import { api } from '@/client/api'
import type { Like, Reply as PReply } from '@prisma/client'
import { type FieldError, FormContainer, type SubmitHandler, TextFieldElement, useForm } from 'react-hook-form-mui'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt'
/* import Box from '@mui/material/Box' */
/* import DeleteIcon from '@mui/icons-material/Delete' */
import IconButton from '@mui/material/IconButton'
/* import List from '@mui/material/List' */
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
/* import SendIcon from '@mui/icons-material/Send' */
import Tooltip from '@mui/material/Tooltip'
import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'

interface IReplyValues {
  reply: string

}

interface IReply {
  replying: string
  comment_id: string
  set_replying: (id: string) => void
  refetch: () => void
}

const Reply: FC<IReply> = (props) => {
  const form_context = useForm<IReplyValues>()

  const reply_mutate = api.writing.reply.useMutation({
    onSuccess: props.refetch
  })

  const reply_val = {
    required: true,
    min: 5
  }

  const handle_error = (_err: FieldError) => {
    return 'Must be at least 5 characters'
  }

  const submit: SubmitHandler<IReplyValues> = (values) => {
    /* console.log('Submitting', values) */
      /* set_user_comment({ body: values.comment, id: 'temp00', created_at: new Date(Date.now()), user_id: '' }) */
      try {
        reply_mutate.mutateAsync({ comment_id: props.comment_id, body: values.reply, action: 'create' })
      } catch (_err) {
        /* console.log(err) */
        /* throw err */
        return
      }
  }


  return false ? (
    <FormContainer onSuccess={submit} formContext={form_context}>
      <ClickAwayListener onClickAway={() => props.set_replying('')}>
        <Stack mt={1} gap={1}>
          <TextFieldElement parseError={handle_error} validation={reply_val}  variant='standard' name='reply' placeholder='reply' multiline size='small' fullWidth />
          <Button variant='outlined' type='submit'>
            Reply
          </Button>
        </Stack>
      </ClickAwayListener>
    </FormContainer>
  ) : null
}

type LikeComment = (like: boolean, comment_id: string) => Promise<Like>

export interface IComment {
  likes: Like[]
  created_at: Date
  id: string
  user_id: string
  replies: PReply[]
  body: string
}

interface ICommentProps {
  comment: IComment
  user_id: string
  like_comment: LikeComment
  replying: string
  set_replying: (id: string) => void
  refetch: () => void
}

export const Comment: FC<ICommentProps> = (props) => {
  const _comment = props.comment
  const _body = _comment.body.trim()
  const comment_len = 75
  const shortened = _body.substring(0, comment_len)
  const like_comment = props.like_comment
  const author = `Guest ${_comment.user_id.slice(_comment.user_id.length - 5)}`
  const liked_comment = _comment.likes.find((like) => like.user_id === props.user_id)
  const [liked, set_liked] = useState(liked_comment ? true : false)
  const [disable_like, set_disable_like] = useState(false)
  const [comment, set_comment] = useState(() => {
    if (_body.length > comment_len) {
      return { body: shortened + ' ... ', view_more: true }
    }
    return { body: shortened, view_more: false }
  })

  // hacky but works for now
  useEffect(() => {
    setTimeout(() => {
      set_disable_like(false)
    }, 3000)
  }, [disable_like])

  const handle_click = (like: boolean) => {
    if (disable_like) return
    set_disable_like(true)
    set_liked(like) // Optimistic Update
    try {
      like_comment(like, _comment.id)
    } catch (_err) {
      /* console.log(_err) */
      /* throw _err */
      return
    }
  }

  // prettier-ignore
  const sec_action = liked ? (
    <Tooltip title='Unlike Comment'>
      <IconButton edge='end' aria-label='unlike' onClick={() => handle_click(false)}> <ThumbUpAlt color='primary' fontSize='small' /> </IconButton>
    </Tooltip>
    ) : (
    <Tooltip title='Like Comment'>
      <IconButton edge='end' aria-label='like' onClick={() => handle_click(true)}> <ThumbUpOffAlt fontSize='small' /> </IconButton>
    </Tooltip>
    )

    console.log(<Reply replying={props.replying} comment_id={_comment.id} set_replying={props.set_replying} refetch={props.refetch} />)


  /* const reply = */
  /*   props.replying === _comment.id ? ( */
  /*     <Reply replying={props.replying} comment_id={_comment.id} set_replying={props.set_replying} refetch={props.refetch} /> */
  /*   ) : ( */
  /*     <Typography sx={{ cursor: 'pointer' }} onClick={() => props.set_replying(_comment.id)} component='span' variant='body2' color='primary'> */
  /*       <br /> */
  /*       Reply */
  /*     </Typography> */
  /*   ) */

  // prettier-ignore
  const view_more = comment.body.length > comment_len && comment.view_more && <Typography sx={{ display: 'inline', cursor: 'pointer' }} onClick={() => set_comment({ body: _body , view_more: false })} component='span' variant='body2' color='InactiveCaption' > View More </Typography>
  // prettier-ignore
  const view_less = comment.body.length > comment_len && !comment.view_more && ( <Typography sx={{ display: 'inline', cursor: 'pointer' }} onClick={() => set_comment({ body: shortened + ' ... ', view_more: true })} component='span' variant='body2' color='InactiveCaption' > <br />View Less </Typography>)
  // prettier-ignore
  /* const secondary = <>{comment.body + ' '} {view_more}{view_less} {reply} </> */
  const secondary = <>{comment.body + ' '} {view_more}{view_less} </>

  return (
    <>
      {/*prettier-ignore*/}
      <ListItem alignItems='flex-start' secondaryAction={sec_action}>
        <ListItemText primary={author} secondary={secondary} />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  )
}

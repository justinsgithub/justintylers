import { api } from '@/client/api'
import { type FC, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt'
import Tooltip from '@mui/material/Tooltip'

interface ILike {
  writing_query: any
}

export const Like: FC<ILike> = (props) => {
  const writing_query = props.writing_query

  const like_mutate = api.writing.like.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })

  const _liked = (writing_query?.data && writing_query?.data?.writing?.likes?.length > 0) || false

  const [liked, set_liked] = useState<boolean>()

  useEffect(() => {
    set_liked(_liked)
  }, [_liked])

  const disable_like = liked === undefined || !writing_query?.data || writing_query.isRefetching || like_mutate.isLoading

  const like_writing = (like: boolean) => {
    if (like) {
      if (disable_like || _liked) return
      set_liked(true) // Optimistic Update
      try {
        like_mutate.mutateAsync({ writing_id: writing_query?.data?.writing?.id || '', action: 'create' })
      } catch {
        return
      }
    } else {
      if (disable_like || !_liked) return
      set_liked(false) // Optimistic Update
      try {
        like_mutate.mutateAsync({ writing_id: writing_query?.data?.writing?.id || '', action: 'delete' })
      } catch (err) {
        throw err
      }
    }
  }

  return (
    <>
      {liked ? (
        <Tooltip title='Unlike Writing'>
          <IconButton color='primary' onClick={() => like_writing(false)}>
            <ThumbUpAlt fontSize='medium' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Like Writing'>
          <IconButton onClick={() => like_writing(true)}>
            <ThumbUpOffAlt color='primary' fontSize='medium' />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

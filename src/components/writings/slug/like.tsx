import { api } from '@/client/api'
import { IconButton } from '@mui/material'
import { ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material'
import { type FC, useEffect, useState } from 'react'

interface ILike {
  slug: string
}

export const Like: FC<ILike> = (props) => {
  const writing_query = api.writing.by_slug.useQuery({ slug: props.slug })

  const like_mutate = api.writing.like.useMutation({
    onSuccess: () => {
      writing_query.refetch()
    }
  })

  const _liked = (writing_query?.data && writing_query?.data?.likes?.length > 0) || false

  const [liked, set_liked] = useState<boolean>()

  useEffect(() => {
    set_liked(_liked)
  }, [_liked])

  const disable_like = liked === undefined || !writing_query?.data || writing_query.isRefetching || like_mutate.isLoading

  const like_writing = () => {
    if (disable_like || _liked) return
    set_liked(true) // Optimistic Update
    try {
      like_mutate.mutateAsync({ writing_id: writing_query?.data?.id || '', action: 'create' })
    } catch {
      return
    }
  }

  const unlike_writing = () => {
    if (disable_like || !_liked) return
    set_liked(false) // Optimistic Update
    try {
      like_mutate.mutateAsync({ writing_id: writing_query?.data?.id || '', action: 'delete' })
    } catch {
      return
    }
  }

  return (
    <>
      {liked ? (
        <IconButton color='primary' onClick={() => unlike_writing()}>
          <ThumbUpAlt fontSize='medium' />
        </IconButton>
      ) : (
        <IconButton onClick={() => like_writing()}>
          <ThumbUpOffAlt fontSize='medium' />
        </IconButton>
      )}
    </>
  )
}

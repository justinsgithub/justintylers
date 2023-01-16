import { NextPage } from 'next'
import { Writings } from '@/components/writings'
import { get_all_writings } from '@/server/get-writings'
import { IWriting } from '@/types/writing'

interface IProps {
  all_writings: IWriting[]
}

export const getStaticProps = async () => {
  const all_writings = get_all_writings(['title', 'slug', 'excerpt', 'preview'])

  return {
    props: { all_writings }
  }
}

const WritingsPage: NextPage<IProps> = (props) => {
  return (
    <Writings all_writings={props.all_writings}/>
  )
}

export default WritingsPage

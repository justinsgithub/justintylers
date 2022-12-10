import { NextPage } from "next";
import { Layout } from "@/components/layout";
import { WritingPreview } from "@/components/writings/preview";
import { get_all_writings } from "@/utils/get-writings";
import { IWriting } from "@/types/writing";
import { useTheme } from "@/components/theme";

interface IProps {
  all_writings: IWriting[]
}

export const getStaticProps = async () => {
  const all_writings = get_all_writings([
    'title',
    /* 'date', */
    'slug',
    /* 'author', */
    /* 'coverImage', */
    'excerpt',
    'preview',
  ])

  return {
    props: { all_writings },
  }
}



const WritingsPage: NextPage<IProps> = (props) => {
  return (
    <Layout>
      <div className="flex-1 relative py-8">
        <div className="lg:px-8 px-4 mb-6">
          <div className="capitalize text-4xl font-bold">
            Writings
          </div>
        </div>
        <div>
          {props.all_writings.map(writing => <WritingPreview key={writing.slug} {...writing}/>)}
        </div>
      </div>
    </Layout>
  )
}

export default WritingsPage

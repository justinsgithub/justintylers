import { FC } from 'react'
import { Anchor } from '@/components/anchor'
import { FaLongArrowAltRight } from 'react-icons/fa'

interface IWritingPreview {
  title: string
  slug: string
  excerpt: string
  preview: string[]
}

export const WritingPreview: FC<IWritingPreview> = (props) => {
  return (
    <section className='mb-6 px-4 lg:px-8'>
      <div className='flex space-x-6 rounded border border-gray-900/10 p-6 hover:no-underline dark:border-gray-50/[0.2]'>
        <div className='flex flex-col'>
          <div className='text-xl font-semibold text-slate-800 dark:text-gray-50'>
            {props.title}
          </div>
          <div className='mb-2 mt-2 text-slate-700 dark:text-gray-300'>
            <div>
              {props.preview.map(line => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className='flex'>
            <Anchor
              classes='text-sm flex space-x-1 items-center text-primary-500'
              to={`/writings/${props.slug}`}
            >
              <span> Read </span>
              <FaLongArrowAltRight className='text-sm' />
            </Anchor>
          </div>
        </div>
      </div>
    </section>
  )
}

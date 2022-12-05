import { FC } from 'react'
import { Anchor } from '../anchor'
import { FaPencilAlt } from 'react-icons/fa'

interface ISidebar {
  isMobile: boolean
}

const menu_items = [{ index: 1, page: 'writings', name: 'Writings' }]

interface IMenuItem {
  index: number
  page: string
  name: string
}

const MenuItem: FC<IMenuItem> = (props) => {
  const default_anchor_classes = 'flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10 '

  const anc_classes_1 = 'text-white dark:text-white group-hover:bg-sky-500 bg-sky-500'

  const anc_classes_2 = 'text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700'

  const anc_class = default_anchor_classes + (props.index === 1 ? anc_classes_1 : anc_classes_2)

  const span_class = 'text-sm font-semibold capitalize ' + (props.index === 1 ? 'font-extrabold text-sky-500 dark:text-sky-400' : '')

  return (
    <li>
      <Anchor to={props.page} classes='group flex items-center mb-4 hover:no-underline' >
        <div className={anc_class}>
          <FaPencilAlt className='text-xs' />
        </div>
        <span className={span_class}>{props.name}</span>
      </Anchor>
    </li>
  )
}

export const Sidebar: FC<ISidebar> = (props) => {
  const { isMobile } = props

  const sidebar_class = isMobile ? 'relative flex-1 flex flex-col w-full' : 'fixed top-0 hidden pt-12 h-screen'

  return (
    <div className={sidebar_class}>
      <div className='mt-9 flex-1 overflow-y-auto py-4 pl-4 pr-4 lg:pl-0'>
        <ul>
          {menu_items.map((item) => (
            <MenuItem key={item.index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

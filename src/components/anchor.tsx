import { FC, ReactNode } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

interface IAnchor {
  children: ReactNode
  classes: string
  href?: string
  /* text: string  */
  to?: string
}

export const Anchor: FC<IAnchor> = (props) => {
  const { to }= props 

  const className = 'transition-colors duration-300 dark:hover:text-white hover:text-gray-900 hover:underline ' + props.classes 

  const return_this = to ? <Link href={to || '/'} className={className}>{props.children}</Link> : <a className={className} href={props.href}>{props.children}</a>

  return return_this
}

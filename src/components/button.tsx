import { FC } from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

interface IButton {
  classes?: string
  text: string 
  type: string
  size?: string
  to?: string
  href?: string
}

const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center font-semibold
`

interface Istyles {
  [key: string]: string
}
  
const styles: Istyles = {
  none: '',
  primary: 'text-white bg-primary-500 hover:bg-primary-400 border-primary-500',
  secondary: 'text-slate-800 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:text-white dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700',
  opposite: 'text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white',
}

const sizes: Istyles = {
  lg: 'h-13 px-8 text-lg rounded-lg',
  md: 'h-10 px-6 text-base rounded',
  sm: 'h-9 px-4 text-sm rounded',
  xs: 'h-6 px-3 text-xs rounded',
}



export const Button: FC<IButton> = (props) => {
  const router = useRouter()
  const {to}= props 
  const selectedStyle = props.type in styles ? styles[props.type] : styles.primary

  const selectedSize = props?.size && props?.size in sizes ? sizes[props.size] : sizes.lg

  const onClick = (event: any) => {
    if (props.to) {
      router.push(props.to)
    }
    if (!props.href) {
      event.preventDefault()
    }
  }

  let class_name = `${defaultStyle} ${selectedStyle} ${selectedSize} `

  if (props.classes) class_name = class_name + props.classes



  const return_this = to ? <Link href={to || '/'} className={class_name}>{props.text}</Link> : <a className={class_name} href={props.href} onClick={onClick}>{props.text}</a>


  return return_this
}

import { FC, useState } from 'react'
import Link from 'next/link'
import { FaBars, FaLightbulb, FaMoon, FaRegLightbulb, FaSun, FaTimes } from 'react-icons/fa'
import { Button } from '@/components/button'
import { Sidebar } from './sidebar'
import { useTheme } from '../theme'

interface INavbar {
  showDrawer: boolean
  toggleDrawer: () => void
}

export const Navbar: FC<INavbar> = (props) => {
  const { showDrawer, toggleDrawer } = props

  const menu_items = [{ type: 'button', text: 'Writings', to: '/writings' }]

  const theme = useTheme()

  return (
    <div className='top-0 z-40 w-full flex-none border-b border-gray-900/10 bg-white/[0.5] backdrop-blur-md backdrop-filter transition-colors duration-300 dark:border-gray-50/[0.2] dark:bg-cust/[0.5] lg:z-50'>
      <div id='navbar-banner' className='banner'>
        <div className='bg-primary-500 py-1 px-4 text-center text-xs capitalize text-white lg:px-8'>
          <span className='mr-1'>
            Thanks for visiting my site, currently under construction
          </span>
        </div>
      </div>
      <div className='max-w-8xl mx-auto w-full'>
        <div className='mx-4 py-3 lg:mx-0 lg:px-8'>
          <div className='relative flex items-center'>
            <Link className='text-md mr-3 flex-none overflow-hidden font-bold text-gray-900 dark:text-gray-200 md:w-auto' href='/' >
              <span className='sr-only'>home</span>
              <span className='flex items-center dark:text-white'>
                JA
              </span>
            </Link>

            <div className='relative ml-auto hidden items-center lg:flex'>
              <nav className='text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300' role='navigation' >
                <ul className='flex items-center space-x-8'>
                  {menu_items.map((item) => (
                    <li key={item.text}>
                      <Button
                        text={item.text}
                        to={item.to}
                        type={item.type}
                      />
                    </li>
                  ))}

                  {/* <li v-for="(item, i) in menus" :key="i"> */}
                  {/*   <Anchor v-if="item.type === 'link'" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" className="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize" > */}
                  {/*     {{ item.text }} */}
                  {/*   </Anchor> */}
                  {/*   <Button v-else-if="item.type === 'button'" :text="item.text" size="xs" className="font-extrabold capitalize" :to="item.route ? item.route : undefined" :href="item.href ? item.href : undefined" /> */}
                  {/* </li> */}
                </ul>
              </nav>
              <div className='ml-6 flex space-x-4 border-l border-gray-900/10 pl-6 dark:border-gray-50/[0.2]'>
                <button aria-label='Toggle Theme' onClick={theme.toggle_theme}>
                  {theme.theme === 'dark' ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            </div>

            <div className='flex flex-1 justify-end lg:hidden'>
              <div className='mr-4 flex space-x-4 border-r border-gray-900/10 pr-4 dark:border-gray-50/[0.2]'>
              <button aria-label='Toggle Theme' onClick={theme.toggle_theme}>
                {theme.theme === 'dark' ? <FaMoon /> : <FaSun />}
              </button>
              </div>
              <button className='flex items-center focus:outline-none' aria-label='Toggle Drawer Menu' onClick={toggleDrawer} >
                <span className='flex items-center text-sm text-gray-600 dark:text-gray-300' aria-hidden='true' >
                  {showDrawer ? <FaTimes /> : <FaBars />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

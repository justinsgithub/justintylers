import { ThemeContext, useTheme } from '@/components/theme'
import { FC, ReactNode, useContext, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'

interface ILayoutProps {
  children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const [showDrawer, setShowDrawer] = useState(false)

  const theme = useTheme()
  console.log(theme)

  const toggleDrawer = () => setShowDrawer(!showDrawer)

  return (
    <div className={theme.theme}>
      <div className='bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-cust dark:text-gray-200'>
        <div className='flex min-h-screen flex-col'>
          <Navbar showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
          <div className='flex w-full flex-1 flex-col'>
            <main className='max-w-8xl relative mx-auto flex h-full w-full flex-1 flex-col'>{children}</main>
          </div>
          <footer className='fixed inset-x-0 bottom-0 z-40 border-t bg-white/[0.5] dark:border-gray-50/[0.2] dark:bg-cust/[0.7] lg:border-gray-900/10'>
            <section className='max-w-8xl mx-auto flex w-full flex-1 space-x-20 px-4 lg:px-8'>
              <div className='w-full pt-1 md:py-2'>
                <div className='flex justify-evenly'>
                  <a href='https://twitter.com/JustinTAngeles'>
                    <FaTwitter className='text-blue-600' />
                  </a>
                  <a href='https://github.com/JustinsGithub'>
                    <FaGithub className='dark:text-white' />
                  </a>
                  <a href='https://linkedin.com/in/JustinTAngeles'>
                    <FaLinkedinIn className='text-blue-700' />
                  </a>
                  <a href='https://instagram.com/JustinTAngeles'>
                    <FaInstagram className='text-red-500' />
                  </a>
                </div>
              </div>
            </section>
          </footer>
        </div>
        <div>
          {showDrawer && (
            <div className='fixed top-0 left-0 z-30 flex h-screen w-screen flex-col bg-gray-100 pt-12 dark:bg-slate-800 lg:hidden '>
              <div className='relative flex flex-1 flex-col overflow-y-auto'>
                {/* <HomeSidebar mode="mobile" /> */}
                <Sidebar isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

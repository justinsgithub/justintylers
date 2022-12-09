import { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/button'

import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' })
  const { data: sessionData } = useSession();

  console.log('SESSION DATA', sessionData)

  return (
    <>
      <Head>
        <title>Home - Justin T. Angeles</title>
        <meta name='description' content='Justin Angeles personal site, writings, software, content' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div className='relative flex flex-1'>
          <div className='flex flex-1'>
            <section className='mb-15 my-5 flex flex-1'>
              <div className='flex flex-1 flex-col items-center'>
                <h1 className='block text-center text-5xl drop-shadow-xl mb-5'>
                  USER:  {sessionData && sessionData.user?.name}
                </h1>
                <h1 className='block text-center text-5xl drop-shadow-xl'>
                  Justin Angeles
                </h1>
                <img className='mt-9 h-40 w-40 rounded-full' src='/images/profile.jpg' alt='Picture of Justin Angeles'
                />

                <div className='mx-4 my-10 flex justify-center space-x-4'>
                  Thank you for taking the time to visit my site. Here you can
                  find links to my various accounts and activities on the web.
                  😊
                  {/* Also feel free to checkout my writings, please enjoy and any feedback is always appreciated 😊. */}
                </div>

                <div className='pb-20px my-9 max-w-lg p-4 shadow-xl'>
                  <div className='box-border w-full flex-col flex-wrap items-center justify-center'>
                    <div className='mb-9'>
                      <img src='/images/writings.png' />
                    </div>
                    <div className='my-9'>
                      I find writing very therapeutic and a great way to prevent
                      building up too much negative energy.
                    </div>
                    <div className='mb-1'>
                      <Button text='View Project' size='xs' classes='font-extrabold capitalize' to='/writings' type='primary' />
                    </div>
                  </div>
                </div>

                <div className='pb-20px my-9 max-w-lg p-4 shadow-xl'>
                  <div className='box-border w-full flex-col flex-wrap items-center justify-center'>
                    <div className='mb-9'>
                      <img src='/images/learning-docs-cover.png' />
                    </div>
                    <div className='my-9'>
                      I created study docs to help learn and document things I
                      learn about. It is pretty much entirely tech subjects.
                    </div>
                    <div className='mb-1'>
                      <Button text='View Project' size='xs' classes='font-extrabold capitalize' href='https://docs.justintylers.com' type='primary' />
                    </div>
                  </div>
                </div>

                <div className='pb-20px my-9 max-w-lg p-4 shadow-xl'>
                  <div className='box-border w-full flex-col flex-wrap items-center justify-center'>
                    <div className='mb-9'>
                      <img src='/images/portfolio-cover.png' />
                    </div>
                    <div className='my-9'>
                      My software development portfolio
                    </div>
                    <div className='mb-1'>
                      <Button text='View Project' size='xs' classes='font-extrabold capitalize' href='https://docs.justintylers.com' type='primary'/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home

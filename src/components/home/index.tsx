import { FC } from 'react'
import { Layout } from '@/components/shared/layout'
import Head from 'next/head'
import { Link } from '@/components/shared/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { PERSONAL_LINKS } from '@/constants'

interface IHomeCard {
  title: string
  description: string
  href: string
  button_text: string
}

const HomeCard: FC<IHomeCard> = (props) => {
  return (
    <Link href={props.href} underline='none'>
      <Box mx='auto' maxWidth={345} my={3}>
        <CardActionArea>
          <Card variant='outlined'>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {props.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {props.description}
              </Typography>
              <Typography mt={2} variant='subtitle1' color='primary'>
                {props.button_text}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Box>
    </Link>
  )
}

export const Home: FC = () => {
  const rw_desc = 'A collection of writing that I did while recovering from drug addiction.'

  return (
    <>
      <Head>
        <title>Justin T. Angeles</title>
        <meta name='description' content='Health, wellness, and fitness' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <Layout>
          <Box mx={1}>
            <Typography variant='h3' component='h1' className='mt-8 text-center'>
              Justin Angeles
            </Typography>
            <Box maxWidth={900} mx='auto'>
              <Typography variant='subtitle1' my={3}>
                Thank you for taking the time to visit my site. Hopefully you find some of this content helpful. Other content coming soon, please
                share with anyone you think may benefit. Find me on <Link href={PERSONAL_LINKS.linked_in}>Linked In</Link>,{' '}
                <Link href={PERSONAL_LINKS.twitter}>Twitter</Link>, and <Link href={PERSONAL_LINKS.instagram}>Instagram</Link>.
              </Typography>
            </Box>
            <HomeCard title='Recovery Writings' description={rw_desc} href='/writings' button_text='view writings' />
          </Box>
        </Layout>
      </div>
    </>
  )
}

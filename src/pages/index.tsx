/* import { signIn, signOut, useSession } from 'next-auth/react' */
/* import { trpc } from '../utils/trpc' */
import { FC } from 'react'
import { NextPage } from 'next'
import { Layout } from '@/components/layout'
import Head from 'next/head'
import { Link } from '@/components/link'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
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
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {props.title}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                {props.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small'>{props.button_text}</Button>
                        </CardActions>
                    </Card>
                </CardActionArea>
            </Box>
        </Link>
    )
}

const Home: NextPage = () => {
    /* const hello = trpc.example.hello.useQuery({ text: 'from tRPC' }) */

    const rw_desc = 'A collection of writing that I did while recovering from crystal meth addiction.'

    return (
        <>
            <Head>
                <title>Justin T. Angeles</title>
                <meta name='description' content='Health, wellness, and fitness' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <Box mx={1}>
                    <Typography variant='h3' component='h1' mt={3} textAlign='center'>
                        Justin Angeles
                    </Typography>
                    <Box maxWidth={900} mx='auto'>
                        <Typography variant='subtitle1' my={3}>
                            Thank you for taking the time to visit my site. Still very much a work in progress but hopefully you find some of this
                            content helpful. Other content coming soon, please share with anyone else you think may benefit. Find me on{' '}
                            <Link href={PERSONAL_LINKS.linked_in}>Linked In</Link>, <Link href={PERSONAL_LINKS.twitter}>Twitter</Link>, and{' '}
                            <Link href={PERSONAL_LINKS.instagram}>Instagram</Link>.
                        </Typography>
                    </Box>
                    <HomeCard title='Recovery Writings' description={rw_desc} href='/writings' button_text='view writings' />
                </Box>
            </Layout>
        </>
    )
}

export default Home

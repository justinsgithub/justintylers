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

interface IHomeCard {
    title: string
    description: string
    href: string
    button_text: string
}

const HomeCard: FC<IHomeCard> = (props) => {
    return (
        <Box mx='auto' my={3}>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {props.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={props.href} underline='none'>
                        <Button size='small'>{props.button_text}</Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    )
}

const Home: NextPage = () => {
    /* const hello = trpc.example.hello.useQuery({ text: 'from tRPC' }) */

    const rw_desc = 'A collection of writing that I did while recovering from crystal meth addiction.'

    return (
        <>
            <Head>
                <title>Writings Health & Wellness - Justin T. Angeles</title>
                <meta name='description' content='Health, wellness, and fitness' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <Box mx={1}>
                    <Typography variant='h3' component='h1' mt={3} textAlign='center'>
                        Writings, Health & Wellness
                    </Typography>
                    <HomeCard title='Recovery Writings' description={rw_desc} href='/writings' button_text='view writings'/>
                </Box>
            </Layout>
        </>
    )
}

export default Home

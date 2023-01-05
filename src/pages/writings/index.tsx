import { FC } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link } from '@/components/link'
import { Layout } from '@/components/layout'
import { get_all_writings } from '@/utils/get-writings'
import { IWriting } from '@/types/writing'
import CardActionArea from '@mui/material/CardActionArea'

interface IWritingPreview {
    title: string
    slug: string
    excerpt: string
    preview: string[]
}

const WritingPreview: FC<IWritingPreview> = (props) => {
    return (
        <Link href={'/writings/' + props.slug} underline='none'>
            <Box mx='auto' maxWidth={345} my={3}>
                <CardActionArea>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                {props.title}
                            </Typography>
                            {props.preview.map((line) => (
                                <Typography key={line} variant='body2' color='text.secondary'>
                                    {line}
                                </Typography>
                            ))}
                            <Typography mt={2} variant='subtitle1' color='primary'>
                                Read
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Box>
        </Link>
    )
}

interface IProps {
    all_writings: IWriting[]
}

export const getStaticProps = async () => {
    const all_writings = get_all_writings([
        'title',
        /* 'date', */
        'slug',
        /* 'author', */
        /* 'coverImage', */
        'excerpt',
        'preview'
    ])

    return {
        props: { all_writings }
    }
}

const WritingsPage: NextPage<IProps> = (props) => {
    return (
        <>
            <Head>
                <title>Recovery Writings - Justin T. Angeles</title>
                <meta name='description' content='Writings about addiction and other life struggles' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <Box mx={2}>
                    <Typography variant='h3' component='h1' mt={3} textAlign='center'>
                        Recovery Writings
                    </Typography>
                    <Box maxWidth={900} mx='auto'>
                    <Typography variant='subtitle1' my={3}>
                        Recovering from crystal meth addiction (using every day for a year straight at one point) was a painfully awkward process.
                        Socializing and doing the smallest errands felt stressful and strange without the assistance of drugs.
                        For months I was constantly parsing my thoughts, wondering if they were realistic ideas or damaged remnants from being high for so long.
                        Writing every day helped reorganize my mind so I could start functioning more naturally.
                    </Typography>
                    <Typography variant='subtitle1' my={3}>
                        Some of these writings feel embarrassing to look back on, but I do not think I would have recovered nearly as well without them.
                        I hope they may help and inspire others going through the dark struggles of life.
                    </Typography>
                    </Box>
                    {props.all_writings.map((writing) => (
                        <WritingPreview key={writing.slug} {...writing} />
                    ))}
                </Box>
            </Layout>
        </>
    )
}

export default WritingsPage

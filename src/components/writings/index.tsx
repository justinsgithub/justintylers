import { FC } from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import { Link } from '@/components/shared/link'
import { Layout } from '@/components/shared/layout'
import { IWriting } from '@/types/writing'
import { useSession } from 'next-auth/react'
import { api } from '@/client/api'

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
          <Card variant='outlined'>
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

export const Writings: FC<IProps> = (props) => {
  // const session = useSession()
  // const writings_query = api.writing.get_all.useQuery()
  /* console.log('writings query', writings_query) */
  /* console.log('SESSION', session) */



  return (
    <>
      <Head>
        <title>Recovery Writings - Justin T. Angeles</title>
        <meta name='description' content='Writings about addiction and other life struggles' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Box mx={2}>
          <Typography variant='h3' component='h1' className='mt-6 text-center'>
            Recovery Writings
          </Typography>
          <Box maxWidth={900} mx='auto'>
            <Typography variant='subtitle1' my={3}>
              Recovering from crystal meth addiction (using every day for a year straight at one point) was a painfully awkward process. Socializing
              and doing the smallest errands felt stressful and strange without the assistance of drugs. For months I was constantly parsing my
              thoughts, wondering if they were realistic ideas or damaged remnants from being high for so long. Writing every day helped reorganize my
              mind so I could start functioning more naturally.
            </Typography>
            <Typography variant='subtitle1' my={3}>
              Some of these writings feel awkward to look back on, but I do not think I would have recovered nearly as well without them. I hope they
              may help and inspire others going through the dark struggles of life.
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

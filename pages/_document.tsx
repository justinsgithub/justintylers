import Document, { Html, Head, Main, NextScript } from 'next/document'
/* import createEmotionServer from '@emotion/server/create-instance' */
import { theme, roboto } from '@/client/theme'
/* import {create_emotion_cache} from '@/client/create-emotion-cache' */

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className={roboto.className}>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link rel='shortcut icon' href='/favicon.ico' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}


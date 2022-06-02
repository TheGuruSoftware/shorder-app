import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import { AuthProvider } from '../auth'
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Shorder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>To Do List</title>
        <link rel="icon" href="/todo_icon.png"/>
      </Head>
      <Component {...pageProps} />
    </> 
  )
}

export default App;

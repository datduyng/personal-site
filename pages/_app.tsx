import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Script from "next/script";
import Head from 'next/head';
import type { AppProps } from "next/app";
import { GA_TRACKING_ID, pageview } from '../lib/gtag.client';

import "../styles/globals.css";
import "../styles/notion-page.css";
import 'prismjs/themes/prism-tomorrow.css'
// used for collection views (optional)
import "react-notion-x/build/third-party/collection.css";
// used for rendering equations (optional)
import "react-notion-x/build/third-party/equation.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Dominic Nguyen</title>
        <meta name="title" content="Dominic Nguyen" />
        <meta name="description" content="Hi, I'm Dominic Nguyen. Welcome to my online real estate. I am a software engineer @ Microsoft. I ❤️ Startups and Opensource" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://domnguyen.qstack.us" />
        <meta property="og:title" content="Dominic Nguyen" />
        <meta property="og:description" content="Hi, I'm Dominic Nguyen. Welcome to my online real estate. I am a software engineer @ Microsoft. I ❤️ Startups and Opensource" />
        <meta property="og:image" content="https://domnguyen.qstack.us/images/seo.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property='twitter:name' content='domnguyen5653' />
        <meta property="twitter:url" content="https://twitter.com/domnguyen5653" />
        <meta property="twitter:title" content="Dominic Nguyen" />
        <meta property="twitter:description" content="Hi, I'm Dominic Nguyen. Welcome to my online real estate. I am a software engineer @ Microsoft. I ❤️ Startups and Opensource" />
        <meta property="twitter:image" content="https://domnguyen.qstack.us/images/seo.png" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <main className="">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;

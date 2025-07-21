import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next';


export default class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="h.png" />
                    <link rel='apple-touch-icon' href='/h.png' />
                    <link rel='manifest' href='/manifest.json' />
                    <meta name="theme-color" content="#007483" />
                    <meta name="msapplication-navbutton-color" content="#007483" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#007483" />
                    <meta name="keywords" content="Hoy, hoy bo,  hoy.bo, Periódico HOY, Periódico HOY Bolivia, hoy bolivia, periodico bolivia,
                     noticias hoy, hoy noticias, noticias bolivia, peridico noticias, peridico, noticias,
                     la razon, el deber, pagina siete, diario pagina siete, hoybolivia.com, diario bolivia" />
                    <meta name="author" content="Hoy" />
                    {/* <meta name="google-adsense-account" content="ca-pub-9268005466612059" /> */}
                    {/* <meta property="og:title" content={`Hoy Bolivia`} /> */}
                    <meta name="description" content={`Periodico Hoy Siete Dias De información: Las noticias mas actualizadas a nivel nacional e internacional.`} />
                    {/* <meta property="og:image" content='/logo.png' /> */}
                    <title>Periodico Hoy</title>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-B23W0R9SHR"
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B23W0R9SHR');
          `}
                    </Script>

                </Head>

                <body>
                    <Main />
                    <Analytics />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

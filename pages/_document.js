import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default function Document() {
    return (

        <Html>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
            <Head />
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
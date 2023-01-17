//* _document.js is only rendered on the server
//- Nextjs skips the definition of content surrounging the basic markup,
//- use this to override this defaut behavior

//* react
import React from 'react';

//* next
import Document, { Html, Head, Main, NextScript } from 'next/document';

//* theme-ui
import { InitializeColorMode } from 'theme-ui'





class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="theme-color" content={theme.palette.primary.main} />  this is leftover from material ui and can be removed*/}
           {/* ! ------------------------------------------------------------------------- */}




          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
            name="description"
            content="Browser based markdown editor"
          />
          <meta
            name="keywords"
            content="md, markdown, editor"
          />

          <meta name="application-name" content="MD Editor" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="MD Editor" />
          <meta name="description" content="Browser based markdown editor" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />

          {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet"></link> */}
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

          <link rel="manifest" href="/manifest.json" />

          <link rel="icon" href="/pwa-icons/favicon.ico" />

          
        
                  
                  


          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#220088" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#220088" />









          {/* ------------------------------------------------------------------------- */}
          <style 
          // jsx="true" global="true"
          >{`
            *,
            *:before,
            *:after {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -moz-osx-font-smoothing: grayscale;
              -webkit-font-smoothing: antialiased;
              font-smoothing: antialiased;
            }

            body,
            html,
            {
              margin: 0;
              padding: 0;
            }
  
            
          `}</style>
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
          
        </body>
      </Html>
    );
  }
}

export default MyDocument
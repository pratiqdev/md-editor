//* _app.js is rendered on the server and the client.
//- on the server during Server Side Rendering and
//- on the client side after rehydration and on every page/route during navigation

//* react
import React, {useEffect, useState} from 'react'


//* next
import NextApp from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'


//* theme-ui
import '../src/theme/editor.css'
import { useThemeUI, ThemeProvider, Flex, Box } from 'theme-ui' 

//* local deps
import theme from '../src/theme/Theme'
import Globals from '../src/theme/Globals'
import toasty from '../src/lib/toasty'


//* external
import { AlertTriangle } from '@emotion-icons/evaicons-solid/AlertTriangle'
import { Info } from '@emotion-icons/evaicons-solid/Info'
import { version } from '../package.json';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import * as SD from '../src/lib/save-version-4'


toast.remove()



const App = ({ Component, pageProps }) => {


  const router = useRouter()

  
  //! this is a temoporary solution! should use values from IDBKeyVal that were transfered to redux store to check if this is first time (vs reload / history change)
  const [firstTime, setFirstTime] = useState(true)
  
  
  useEffect(() => {
    SD.init()
    toast.remove()

  }), [];
  
    return (
      <ThemeProvider theme={theme}>
        <Globals />
          <Head>
            <title>MD Editor</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
            <Toaster reverseOrder={true} />
            <Component {...pageProps} />

      </ThemeProvider>
    )
}

export default App

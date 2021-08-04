//* REACT _________________________________________________________________________________________
import {useState, useRef, useEffect} from 'react'

//* NEXT __________________________________________________________________________________________
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';
import marked from 'marked'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
// import LoadModal from '../src/ui/modals/LoadModal'
// import SettingsModal from '../src/ui/modals/SettingsModal'
import toasty from '../src/lib/toasty';
import * as SD from '../src/lib/save-version-4.js'



const Ace = dynamic(
  () => import('../src/ui/Ace.js'),
  { ssr: false }
)

const Render = dynamic(
    () => import('../src/ui/Render.js'),
    { ssr: false }
  )


let DONE_LOADING = false 

const MDPage = props => {

  // const context = useThemeUI();
  // const { theme, components, colorMode, setColorMode } = context;

  const breakIndex = useBreakpointIndex();

  //~ DEFAULTS ___________________________________________________________________________________________________________________________________
  // let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [parentContent, setParentContent] = useState('LOADING') //!!!!!!!!!! STEP 3
  const [currentSettings, setCurrentSettings] = useState()

  const [editorLayout, setEditorLayout] = useState({})
  const [renderLayout, setRenderLayout] = useState({})
  const [layoutType, setLayoutType] = useState('split')
  const [parentTrigger, setParentTrigger] = useState(false)



  const handleChange = (val, line, column) => {
      console.log('EDITOR | handleChange - 034958')
      setParentContent(val) 
      if(line && column && line !== 0 && column !== 0){
        SD.updateContent(val, line + 1, column + 1)
      }else{
        SD.updateContent(val)
      }
  }

  const loadContent = () => {
    SD.getActive()
      .then(x=>setParentContent(x.content)) //!!!!!!!!!!!!!! STEP 2
      .catch(err=>console.log(`couldnt get result from getActive: ${err}`))
  }


  let WELCOME_LIMIT = 0

  const welcomeAlerts = () => {
    WELCOME_LIMIT++
    if(WELCOME_LIMIT === 0){
    setTimeout(() => {
        toasty({
          text: `Using version ${version}`,
          type: 'special',
          time: 3000,
          agree: {
            text: 'Got it',
          },
          closeAnyway: true
        })


        
        
      }, 1000);

      setTimeout(() => {
        toasty({
          text: `View the documentation for more info or guides on how to use this application`,
          type: 'info',
          time: 6000,
          dismiss: {
            text: 'Nah',
          },
          agree: {
            text: 'View docs',
            func: () => {router.push('/docs')},
          },
          closeAnyway: true
        })


        
        
      }, 4000);

      setTimeout(() => {
        toasty({
          text: `If you discover any problems please submit a new issue on the github repository!`,
          type: 'alert',
          time: 6000,
          dismiss: {
            text: 'Maybe Later',
          },
          agree: {
            text: 'GitHub',
            func: () => {location.replace('https://github.com/pratiqdev/md-editor/issues')},
          },
          closeAnyway: true
        })


        
        
      }, 10000);
    }
  }

  useEffect(()=>{
    console.log('EDITOR | useEffect | parentTrigger triggered')
 
    loadContent() //!!!!!!!!!!!! STEP 1 

  }, [parentTrigger]) //!!!!!! ORIGIN

  useEffect(()=>{
    if(!DONE_LOADING){
      setParentTrigger(!parentTrigger)
      DONE_LOADING = true
      welcomeAlerts()
    }
  })

  //~ EDITOR / RENDER LAYOUT __________________________________________________________________________________________________________________




  const [fontSize, setFontSize] = useState('1rem')
  
  //* useEffect for layout changes
  useEffect(()=>{
    console.log(`new layout type: ${layoutType}`)

    if(layoutType === 'editor'){
      setEditorLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '0',
        r: '0',
        w: '',
        h: '',
      })
      setRenderLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '0',
        r: '0',
        w: '',
        h: '',
      })
    }



    if(layoutType === 'render' ){
      setEditorLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '100vw',
        r: '0',
        w: '',
        h: '',
      })
      setRenderLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '0',
        r: '0',
        w: '',
        h: '',
      })
    }



    if(layoutType === 'split' && breakIndex <= 1){
      setEditorLayout({
        p: 'absolute',
        t: '3rem',
        b: '50vh',
        l: '0',
        r: '0',
        w: '',
        h: '',
      })
      setRenderLayout({
        p: 'absolute',
        t: '50vh',
        b: '0',
        l: '0',
        r: '0',
        w: '',
        h: '',
      })
    }
    if(layoutType === 'split' && breakIndex > 0){
      setEditorLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '0',
        r: '50vw',
        w: '',
        h: '',
      })
      setRenderLayout({
        p: 'absolute',
        t: '3rem',
        b: '0',
        l: '50vw',
        r: '0',
        w: '',
        h: '',
      })
    }


  }, [layoutType, breakIndex])




  //! RETURN ELEMENTS __________________________________________________________________________________________________________________
  return(
      <>
      <Navbar 
        fixed 
        editor
        setLayout={setLayoutType}
        layoutType={layoutType}
        causeParentTrigger={()=>setParentTrigger(!parentTrigger)}
        />


        <Flex sx={{flexDirection: ['column', 'row', 'row']}}>
          <Box sx={{
            height: editorLayout.h,
            width: editorLayout.w
            }} >
            <Ace 
              setLayout={setLayoutType}
              parentContent={parentContent} //!!!!!!!! STEP 4
              handleChange={handleChange} 
              layout={editorLayout}
              fontSize={fontSize}
              useTrigger={parentTrigger}
            />
          </Box>


          <Box sx={{height: '3vh', overflow: 'hidden', overflowY: 'auto'}} >
            <Render 
              useTrigger={parentTrigger}
              parentContent={parentContent} 
              layout={renderLayout}
            />
          </Box>
        </Flex>









      </>
  )
}


export default MDPage
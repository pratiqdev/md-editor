//* REACT _________________________________________________________________________________________
import {useState, useRef, useEffect} from 'react'

//* NEXT __________________________________________________________________________________________
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import styled from "@emotion/styled";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';
import marked from 'marked'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import LoadModal from '../src/ui/modals/LoadModal'
import SettingsModal from '../src/ui/modals/SettingsModal'
import toasty from '../src/lib/toasty';

const Ace = dynamic(
  () => import('../src/ui/Ace.js'),
  { ssr: false }
)

const Render = dynamic(
    () => import('../src/ui/Render.js'),
    { ssr: false }
  )




const MDPage = props => {

  // const context = useThemeUI();
  // const { theme, components, colorMode, setColorMode } = context;

  const breakIndex = useBreakpointIndex();

  //~ DEFAULTS ___________________________________________________________________________________________________________________________________
  let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [content, setContent] = useState(defaultText)
  const [showLoad, setShowLoad] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  // const [currentTheme, setCurrentTheme] = useState('dark')
  const [currentSettings, setCurrentSettings] = useState({

  })

  const handleChange = val => {
    setContent(val)
    localStorage.setItem('content', val)
  }

  //~ RESET ______________________________________________________________________________________________________________________________________
  const handleReset = () => {
      localStorage.setItem('content', defaultText)
      setContent(defaultText)
      toasty({
        type: 'info',
        text: 'Reset editor to defaults'
      })
  }

  
  //~ MODAL TOGGLES ______________________________________________________________________________________________________________________________
  const showLoadModal = () => {
      setShowLoad(true)
  }

  const showSettingsModal = () => {
    setShowSettings(true)
  }





  // const toggleTheme = () => {
  //   if(colorMode === 'dark'){
  //     editor.setTheme('ace/theme/monokai')
  //   }else{
  //     editor.setTheme('ace/theme/dawn')
  //   }
  // }

  useEffect(()=>{
    // toggleTheme()
    if(window.localStorage){

      setTimeout(() => {
          let LSContent = localStorage.getItem('content')
          if(LSContent !== '' ){
              setContent(LSContent)
              // console.log('set content from local storage')
          }
      }, 500);

  }else{
      setContent(defaultText)
      console.log('editor.js @108 | setting default text')
      toasty({
          type: 'alert',
          text: 'No local storage is available to Load data! Are you incognito?'
      })
  }
  })

  //~ EDITOR / RENDER LAYOUT __________________________________________________________________________________________________________________

  const [editorLayout, setEditorLayout] = useState({})
  const [renderLayout, setRenderLayout] = useState({})
  const [layoutType, setLayoutType] = useState('split')



  const [fontSize, setFontSize] = useState('.7rem')
  

  useEffect(()=>{

    // console.log(`layout: ${layoutType}`)
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

  






  //~ RETURN ELEMENTS __________________________________________________________________________________________________________________
  return(
      <>
      <Navbar 
        fixed 
        editor
        setLayout={setLayoutType}
        layoutType={layoutType}
        showLoad={showLoadModal} 
        showSettingsModal={showSettingsModal}/>










        <Flex sx={{flexDirection: ['column', 'row', 'row']}}>
          
          <Box sx={{
            height: editorLayout.h,
            width: editorLayout.w
            }} >
          <Ace 
            setLayout={setLayoutType}
            defaultContent={content} 
            handleChange={handleChange} 
            layout={editorLayout}
            fontSize={fontSize}
            />
          </Box>


          <Box sx={{height: '3vh', overflow: 'hidden', overflowY: 'auto'}} >
          <Render 
            editorContent={content} 
            layout={renderLayout}
            />
          </Box>

        </Flex>









          {showLoad && 
            <LoadModal 
              handleDeny={()=>setShowLoad(false)} 
              handleAccept={()=>LoadContent()}/>
          }


          {showSettings && 
            <SettingsModal 
            handleDeny={()=>setShowSettings(false)} 
            handleAccept={()=>setShowSettings(false)}/>}
      </>
  )
}


export default MDPage
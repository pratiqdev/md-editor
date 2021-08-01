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
import * as SD from '../src/lib/save-version-3.js'



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
  // let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [content, setContent] = useState('')
  const [currentSettings, setCurrentSettings] = useState({

  })

  const handleChange = val => {
    setContent(val)
    SD.updateContent(val)
  }




  useEffect(()=>{
    SD.init()
    SD.getActive()
  })

  //~ EDITOR / RENDER LAYOUT __________________________________________________________________________________________________________________

  const [editorLayout, setEditorLayout] = useState({})
  const [renderLayout, setRenderLayout] = useState({})
  const [layoutType, setLayoutType] = useState('split')
  const [trigger, setTrigger] = useState(false)


  const [fontSize, setFontSize] = useState('.7rem')
  

  useEffect(()=>{

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

  
  useEffect(()=>{
    if(typeof SD !== 'undefined'){
      SD.getActive()
      setTimeout(() => {
        
        setContent(SD.getActive().content) //! causing errors in BUST ??????
      }, 100);
    }
    console.log('trigger!')
  }, [trigger])





  //~ RETURN ELEMENTS __________________________________________________________________________________________________________________
  return(
      <>
      <Navbar 
        fixed 
        editor
        setLayout={setLayoutType}
        layoutType={layoutType}
        trigger={()=>setTrigger(!trigger)}
        // showLoad={showLoadModal} 
        // showSettingsModal={showSettingsModal}
        />










        <Flex sx={{flexDirection: ['column', 'row', 'row']}}>
          
          <Box sx={{
            height: editorLayout.h,
            width: editorLayout.w
            }} >
          <Ace 
            setLayout={setLayoutType}
            content={content} 
            handleChange={handleChange} 
            layout={editorLayout}
            fontSize={fontSize}
            trigger={trigger}
            />
          </Box>


          <Box sx={{height: '3vh', overflow: 'hidden', overflowY: 'auto'}} >
          <Render 
            editorContent={content} 
            layout={renderLayout}
            />
          </Box>

        </Flex>









          {/* {showLoad && 
            <LoadModal 
              handleDeny={()=>setShowLoad(false)} 
              handleAccept={()=>LoadContent()}/>
          }


          {showSettings && 
            <SettingsModal 
            handleDeny={()=>setShowSettings(false)} 
            handleAccept={()=>setShowSettings(false)}/>} */}
      </>
  )
}


export default MDPage
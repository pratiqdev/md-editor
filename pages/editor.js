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


let parentFinishedLoading = false 

const MDPage = props => {

  // const context = useThemeUI();
  // const { theme, components, colorMode, setColorMode } = context;

  const breakIndex = useBreakpointIndex();

  //~ DEFAULTS ___________________________________________________________________________________________________________________________________
  // let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [parentContent, setParentContent] = useState('LOADING')
  const [currentSettings, setCurrentSettings] = useState()

  const [editorLayout, setEditorLayout] = useState({})
  const [renderLayout, setRenderLayout] = useState({})
  const [layoutType, setLayoutType] = useState('split')
  const [parentTrigger, setParentTrigger] = useState(false)



  const handleChange = val => {
      console.log('EDITOR | handleChange - 034958')
      setParentContent(val) 
      SD.updateContent(val) ? SD.updateContent(val) : console.log('EDITOR | failed to call SD.updateContent')
  }


  //* useEffect for load only - loading should only happen in the parent
  useEffect(()=>{
    if(!parentFinishedLoading){
      parentFinishedLoading = true
    
      console.log(`running load useEffect - should only happen once!`)
      
      if(typeof SD !== 'undefined'){
        SD.init() && SD.init() // check if SD.init exists before calling
        // check if getActivve exists before calling
        setTimeout(() => {
          let contentReturnedFromSD = SD.getActive() ? SD.getActive().content : false
          
          setParentContent(contentReturnedFromSD || 'no content to pass from parent 65434635642') //! causing errors in BUST ??????

          setParentTrigger(!parentTrigger)
      
        }, 100);
      }

    }

  })

  //~ EDITOR / RENDER LAYOUT __________________________________________________________________________________________________________________




  const [fontSize, setFontSize] = useState('1rem')
  
  //* useEffect for layout changes
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




  //~ RETURN ELEMENTS __________________________________________________________________________________________________________________
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
              parentContent={parentContent} 
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
//* REACT _________________________________________________________________________________________
import {useState, useRef, useEffect} from 'react'

//* NEXT __________________________________________________________________________________________
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text, Spinner } from "theme-ui";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';
import marked from 'marked'
import gsap from 'gsap'
import { debounce } from 'lodash'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import * as SD from '../src/lib/save-version-4.js'
import * as ALERT from '../src/lib/alert'



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

  const REF_SPINNER = useRef(null)

  const [parentContent, setParentContent] = useState('LOADING') //!!!!!!!!!! STEP 3
  const [currentSettings, setCurrentSettings] = useState()

  const [editorLayout, setEditorLayout] = useState({})
  const [renderLayout, setRenderLayout] = useState({})
  const [layoutType, setLayoutType] = useState('split')
  const [parentTrigger, setParentTrigger] = useState(false)
  // const [showSpinner, setShowSpinner] = useState(true)



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

  const hideSpinner = () => {
    gsap.to([REF_SPINNER.current], {opacity: '0', pointerEvents: 'none', duration: 1, delay: 1.5})
  }


  const handleNewFromShortcut = () => {
    
    SD.createNewAndActivate()
      .then(()=>{
        setParentTrigger(!parentTrigger)
      })

  }



  useEffect(()=>{
    console.log('EDITOR | useEffect | parentTrigger triggered')
 
    loadContent() //!!!!!!!!!!!! STEP 1 

  }, [parentTrigger]) //!!!!!! ORIGIN

  useEffect(()=>{
    if(!DONE_LOADING){
      setParentTrigger(!parentTrigger)
      DONE_LOADING = true
      hideSpinner()
      ALERT.welcomeAlerts()
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

        
          <Flex ref={REF_SPINNER} sx={{zIndex: '100000', top: '0', position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', bg: 'grey_2'}}>
            <Spinner size={80} strokeWidth={2} speed={10}/>
          </Flex>


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
              handleNewFromShortcut={handleNewFromShortcut}
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
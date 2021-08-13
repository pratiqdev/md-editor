//* REACT _________________________________________________________________________________________
import {useState, useRef, useEffect} from 'react'

//* NEXT __________________________________________________________________________________________
import dynamic from 'next/dynamic'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import { useBreakpointIndex } from "@theme-ui/match-media"; 

//* EXTERNAL ______________________________________________________________________________________
import gsap from 'gsap'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import * as SD from '../src/lib/saveData.js'
import * as ALERT from '../src/lib/alert'
import MdeLogo from '../src/ui/MdeLogo'



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
  const REF_SPINNER_LOGO = useRef(null)
  const REF_SPINNER_LOGO_OUTLINE = useRef(null)

  const [parentContent, setParentContent] = useState('LOADING') //!!!!!!!!!! STEP 3
  const [currentSettings, setCurrentSettings] = useState()
  const [showLoad, setShowLoad] = useState(true)

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

  var tl = gsap.timeline({repeat: -1, repeatDelay: 0});
  const loadContent = () => {
    if(REF_SPINNER.current && REF_SPINNER_LOGO.current && REF_SPINNER_LOGO_OUTLINE.current){
      gsap.to([REF_SPINNER_LOGO.current], { duration: .5, repeat: -1, yoyo: true, scale: 1.2, ease: 'Power1.easeInOut'})
      
      tl.to([REF_SPINNER_LOGO_OUTLINE.current], { duration: .5,  scale: 8, ease: 'Power1.easeInOut'})
      tl.to([REF_SPINNER_LOGO_OUTLINE.current], { duration: .5,  opacity: '0', ease: 'Power1.easeInOut'})
    }

    SD.getActive()
      .then(x=>setParentContent(x.content)) //!!!!!!!!!!!!!! STEP 2
      .catch(err=>console.log(`couldnt get result from getActive: ${err}`))
  }

  const hideSpinner = () => {
    if(REF_SPINNER.current){
      gsap.to([REF_SPINNER.current], {opacity: '0', pointerEvents: 'none', duration: 1, delay: 1.5})
    }
    setTimeout(() => {
      tl.pause()
      setShowLoad(false)
    }, 1500);

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




  const [fontSize, setFontSize] = useState(10)
  
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
        handleNewFromShortcut={handleNewFromShortcut}

        />

        {showLoad &&
          <Flex ref={REF_SPINNER} sx={{zIndex: '100000', top: '0', position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', bg: 'grey_2'}}>
            <Box ref={REF_SPINNER_LOGO_OUTLINE} sx={{position: 'absolute', width:'1rem', height: '1rem', borderRadius: '50%', 
            boxShadow: theme => `0 0 .2rem .2rem ${theme.colors.grey_3}`, 
            // border: '1px solid', 
            // borderColor: 'grey_6'
          }} />
            <Box ref={REF_SPINNER_LOGO} sx={{width: '5rem', height: '5rem'}}>
              <MdeLogo  />
            </Box>
          </Flex>
        }


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
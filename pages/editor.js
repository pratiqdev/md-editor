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
import SaveModal from '../src/ui/modals/SaveModal'
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

  // DEFAULTS ___________________________________________________________________________________________________________________________________
  let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [content, setContent] = useState(defaultText)
  const [showSave, setShowSave] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  // const [currentTheme, setCurrentTheme] = useState('dark')
  const [currentSettings, setCurrentSettings] = useState({

  })

  const handleChange = val => {
    setContent(val)
    localStorage.setItem('content', val)
  }

  // RESET ______________________________________________________________________________________________________________________________________
  const handleReset = () => {
      localStorage.setItem('content', defaultText)
      setContent(defaultText)
      toasty({
        type: 'info',
        text: 'Reset editor to defaults'
      })
  }

  
  // MODAL TOGGLES ______________________________________________________________________________________________________________________________________
  const showSaveModal = () => {
      setShowSave(true)
  }

  const showSettingsModal = () => {
    setShowSettings(true)
  }




  const saveContent = () => {
      console.log('saving content!')
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
      toasty({
          type: 'alert',
          text: 'No local storage is available to save data! Are you incognito?'
      })
  }
  })

  // EDITOR / RENDER LAYOUT ____________________________________________________________________________________________________________________________________

  const [editorLayout, setEditorLayout] = useState({})

  const [renderLayout, setRenderLayout] = useState({})
    


  
  useEffect(()=>{
    if(breakIndex <= 1){
      setEditorLayout({
        t: '3rem',
        b: '55vh',
        l: '0',
        r: '0'
      })
      setRenderLayout({
        t: '45vh',
        b: '0',
        l: '0',
        r: '0'
      })
    }else{
      setEditorLayout({
        t: '3rem',
        b: '0',
        l: '0',
        r: '50vw'
      })
      setRenderLayout({
        t: '3rem',
        b: '0',
        l: '50vw',
        r: '0'
      })
    }
  }, [breakIndex])

  return(
      <>
      <Navbar 
        fixed 
        editor 
        handleReset={handleReset} 
        showSave={showSaveModal} 
        showSettingsModal={showSettingsModal}/>

          <Ace 
            defaultContent={content} 
            handleChange={handleChange} 
            layout={editorLayout}
            />

          <Render 
            editorContent={content} 
            layout={renderLayout}
             />

          {showSave && 
            <SaveModal 
              handleDeny={()=>setShowSave(false)} 
              handleAccept={()=>saveContent()}/>
          }


          {showSettings && 
            <SettingsModal 
            handleDeny={()=>setShowSettings(false)} 
            handleAccept={()=>setShowSettings(false)}/>}
      </>
  )
}


export default MDPage
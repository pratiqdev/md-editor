//* REACT _________________________________________________________________________________________
import {useState, useRef, useEffect} from 'react'

//* NEXT __________________________________________________________________________________________
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import styled from "@emotion/styled";

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';
import marked from 'marked'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import SaveModal from '../src/ui/modals/SaveModal'
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

  // DEFAULTS ___________________________________________________________________________________________________________________________________
  let defaultText = '# MD Editor \r\n Made with \r\n ```js \r\n - React \r\n - Next \r\n - <3 \r\n  ``` \r\n > By Michael Jannetta'


  const [content, setContent] = useState(defaultText)
  const [showSave, setShowSave] = useState(false)

  const handleChange = val => {
    setContent(val)
    localStorage.setItem('content', val)
  }

  // RESET ______________________________________________________________________________________________________________________________________
  const handleReset = () => {
      localStorage.setItem('content', defaultText)
      setContent(defaultText)
  }

  
  // SAVE ______________________________________________________________________________________________________________________________________
  const showSaveDialogue = () => {
      setShowSave(true)
  }

  const saveContent = () => {
      console.log('saving content!')
  }

  useEffect(()=>{
    if(window.localStorage){

      setTimeout(() => {
          let LSContent = localStorage.getItem('content')
          if(LSContent !== '' ){
              setContent(LSContent)
              // REF_TEXTAREA.current.value = LSContent
              console.log('set content from local storage')
          }
      }, 500);

  }else{
      setContent(defaultText)
      // REF_TEXTAREA.current.value = defaultText
      toasty({
          type: 'alert',
          text: 'No local storage is available to save data! Are you incognito?'
      })
  }
  })

  return(
      <>
      <Navbar fixed editor handleReset={handleReset} showSave={showSaveDialogue}/>

          <Ace 
            defaultContent={content} 
            handleChange={handleChange} 
            top={''} 
            bottom={''} 
            right={''} 
            left={''}/>

          <Render 
            editorContent={content} 
            top={''} 
            bottom={''} 
            right={''} 
            left={''} />

          {showSave && <SaveModal handleDeny={()=>setShowSave(false)} handleAccept={()=>saveContent()}/>}
      </>
  )
}


export default MDPage
/** @jsxImportSource theme-ui */

//* react
import {useEffect, useState, useRef, forwardRef, useImperativeHandle} from 'react'
import _ from 'lodash'

//* next
import Link from "next/link";
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

//* theme
import { useThemeUI, Flex, Box, Button, Text, Grid, Select, Input } from "theme-ui";
import styled from "@emotion/styled";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 


//* local deps
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false }) //<- set SSr to false
import NavMenu from './NavMenu'
import * as SD from '../lib/save-version-4'
import useLongPress from '../lib/longPress'

import LoadModal from './modals/LoadModal'
import SettingsModal from './modals/SettingsModal'
import Tipper from './Tipper'


import { showInstallPrompt, libInstallStatus, triggerInstallFlow, deferredPrompt } from '../lib/install'

import MdeLogo from './MdeLogo'

//* external deps
import { get, set } from 'idb-keyval';

import { MenuOutline } from "@emotion-icons/evaicons-outline/MenuOutline";
import { Search } from "@emotion-icons/boxicons-regular/Search";
import { CloseOutline as Close } from "@emotion-icons/evaicons-outline/CloseOutline";

import {CaretLeft} from '@emotion-icons/boxicons-regular/CaretLeft'
import {CaretRight} from '@emotion-icons/boxicons-regular/CaretRight'
import {CaretUp} from '@emotion-icons/boxicons-regular/CaretUp'
import {CaretDown} from '@emotion-icons/boxicons-regular/CaretDown'
import {LayoutSplit} from '@emotion-icons/bootstrap/LayoutSplit'








const Navbar = forwardRef((props, ref) => {

  const breakIndex = useBreakpointIndex();






  const router = useRouter()
  const context = useThemeUI();
  const { theme, components, colorMode, setColorMode } = context;
  const [themeColor, setThemeColor] = useState('#0000ffff')
  const [appInstallStatus, setAppInstallStatus] = useState(libInstallStatus)
  const [deferred, setDeferred] = useState()

  const [showLoad, setShowLoad] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [activeFileData, setActiveFileData] = useState({name: '-Title-', date: '-date-'})



  //~ MODAL TOGGLES ______________________________________________________________________________________________________________________________
  const showLoadModal = () => {
      setShowLoad(true)
      // props.causeParentTrigger()
  }

  const hideLoadModal = () => {
    setShowLoad(false)
    props.causeParentTrigger()
  }

  const showSettingsModal = () => {
    setShowSettings(true)
  }

  useImperativeHandle(ref,
    () => {
        test: () => {// function name
            // the above func. is customized function as it can 
            // behave differently than its normal behavior 
            console.log('useImperativeHandleRef')
         } 
    });  
  




  useEffect(()=>{
    triggerInstallFlow()
    setAppInstallStatus(libInstallStatus)
    setDeferred(deferredPrompt)

    if(libInstallStatus === 'can-be-installed'){
      setTimeout(() => {
        toasty({
          text: `${envi} ${version} ${testMode && '(Test mode)'} ${gitSha ?0 `@${branch} - ${gitSha}` : '@localhost'}`,
          type: 'special',
          time: 20000,
          agree: {
            text: 'Install App',
            func: ()=> showInstallPrompt()
          },
          dismiss: {
            text: 'Maybe Later'
          },
          closeAnyway: true
        })
      }, 30000);
    }




 


    
  }, [props, router.query.q, libInstallStatus]);

const [toggle, setToggle] = useState(true)

const toggleLayout = () => {
  console.log('toggle layout????')
  if(props.setLayout){
    if(toggle){
      setToggle(false)
      props.setLayout('editor')
    }else{
      setToggle(true)
      props.setLayout('render')
    }
  }
}

const splitWindow = () => {
  props.setLayout('split')
}

const layoutLongPress = useLongPress(()=>toggleLayout(), ()=>splitWindow(), 200)

useEffect(()=>{
  SD.getActive()
    .then(x=>setActiveFileData(x))
})



// console.log(`props.layout: ${props.layoutType}`)

  return (
    <>
      <Box
      suppressHydrationWarning={true}
        sx={{
          position: props.fixed ? "fixed" : "relative",
          display: "flex",
          top: "0",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "100vw",
          height: "3rem",
          bg: 'transparent',
          // bg: props.transparent
          //   ? "transparent"
          //   : props.bg
          //   ? props.bg
          //   : "grey_4",
          py: [0, 1, 2],
          px: 2,
          pr: 1,
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            position: "absolute",
            bg: 'transparent',
            // if there is no scroll ref
            bg: props.bg
              ? props.bg
              : "grey_4",
            borderBottom: '1px solid',
            borderColor: 'grey_0'
          }}
        />
        <Flex sx={{ alignItems: "center", zIndex: 1, justifyContent: 'space-between', flex:1 }}>

          <Flex sx={{alignItems: 'center'}}>


          <Link href='/'>
            <Flex sx={{  height: '2rem', ml: 3, cursor: "pointer", fontSize: 6, alignItems: 'center' }}>
              <MdeLogo /> 
            </Flex>
          </Link>

            {props.editor &&
              <Flex sx={{fontSize: 0, ml: 5, flexDirection: 'column', whiteSpace: 'nowrap', cursor: 'pointer'}}
              onClick={(e)=>setShowLoad(true)}
              >
                <Box sx={{fontSize: 1, p:0, m:0}}>
                  {activeFileData && activeFileData.name}
                </Box>
                <Box sx={{my: '-.2rem',}}>
                  {activeFileData && activeFileData.date }
                </Box>
                {/* <Box sx={{ p:0, m:0}}>
                  {activeFileData && activeFileData.edit }
                </Box> */}
              </Flex>
              }

              </Flex>

          {props.editor &&
          <Flex>

              <Tipper tip="Click to toggle view, hold to split view" delay={[1000, 0]}>
                <Button variant='icon.plain' sx={{mr:3}} {...layoutLongPress}>
                    {(props.layoutType === 'editor' && breakIndex <=0) &&<CaretUp size='22'/>}
                    {(props.layoutType === 'render' && breakIndex <=0) &&<CaretDown size='22'/>}
                    {(props.layoutType === 'split' && breakIndex <=0) &&<LayoutSplit  style={{transform: 'rotate(90deg)'}} size='18'/>}

                    {(props.layoutType === 'editor' && breakIndex > 0) &&<CaretLeft size='22'/>}
                    {(props.layoutType === 'render' && breakIndex > 0) &&<CaretRight size='22'/>}
                    {(props.layoutType === 'split' && breakIndex > 0) &&<LayoutSplit size='18'/>}
                </Button>
              </Tipper>
            
          </Flex>
          }


        </Flex>

        {/* right aligned default buttons */}
        <Flex mr={0}>
          
          <ThemeToggle />
          <NavMenu 
            appInstallStatus={appInstallStatus} 
            showSettingsModal={showSettingsModal} 
            showLoad={showLoadModal}
            editor={props.editor}
            
            />

        </Flex>
      </Box>








      {/* empty box used for extra margin for fixed nav */}
      <Box
        sx={{
          mt: props.fixed ? 8 : 0,
        }}
      ></Box>

        
        {showLoad && 
            <LoadModal 
              causeParentTrigger={props.causeParentTrigger}
              handleDeny={hideLoadModal} 
              handleAccept={()=>LoadContent()}/>
          }


          {showSettings && 
            <SettingsModal 
            causeParentTrigger={props.causeParentTrigger}
            handleDeny={()=>setShowSettings(false)} 
            handleAccept={()=>setShowSettings(false)}/>}
      
    </>
  );
});
export default Navbar;

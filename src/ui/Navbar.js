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
const Logo = dynamic(() => import("./Logo"), { ssr: false }) //<- set SSr to false
import NavMenu from './NavMenu'
import { activeSaveData } from '../lib/save'
import useLongPress from '../lib/longPress'


import { showInstallPrompt, libInstallStatus, triggerInstallFlow, deferredPrompt } from '../lib/install'


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


  useImperativeHandle(
      ref,
      () => ({
          resetSearch() {
            clearInput()
          }
       }),
   )




  const router = useRouter()
  const context = useThemeUI();
  const { theme, components, colorMode, setColorMode } = context;
  const [logoColor, setLogoColor] = useState('#ffffff')
  const [themeColor, setThemeColor] = useState('#0000ffff')
  const [appInstallStatus, setAppInstallStatus] = useState(libInstallStatus)
  const [deferred, setDeferred] = useState()






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


    colorMode === undefined || colorMode === "dark"
    ? setLogoColor('#ffffff')
    : setLogoColor('#000000')


 


    
  }, [props, router.query.q, libInstallStatus]);

const [toggle, setToggle] = useState(true)

const toggleLayout = () => {
  if(toggle){
    setToggle(false)
    props.setLayout('editor')
  }else{
    setToggle(true)
    props.setLayout('render')

  }
}

const splitWindow = () => {
  props.setLayout('split')
}

const layoutLongPress = useLongPress(()=>toggleLayout(), ()=>splitWindow(), 300)





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
          }}
        />
        <Flex sx={{ alignItems: "center", zIndex: 1, justifyContent: 'space-between', flex:1 }}>

          <Link href='/'>
            <Box sx={{ ml: 3, mt: 1, cursor: "pointer", fontSize: [4,5,5] }}>
              MD Editor - {activeSaveData.id}
            </Box>
          </Link>


          {props.editor &&
          <Flex>
            {/* {
            props.layoutType === 'editor' && 
              <Button variant='icon.plain' sx={{mr:3}} 
                onClick={()=>props.setLayout('render')} 
                onDoubleClick={()=>props.setLayout('split')}>
                  <CaretLeft size='22'/>
              </Button>
            } */}

              <Button variant='icon.plain' sx={{mr:3}} {...layoutLongPress}>
                  {(props.layoutType === 'editor' && breakIndex <=0) &&<CaretUp size='22'/>}
                  {(props.layoutType === 'render' && breakIndex <=0) &&<CaretDown size='22'/>}
                  {(props.layoutType === 'split' && breakIndex <=0) &&<LayoutSplit  style={{transform: 'rotate(90deg)'}} size='18'/>}

                  {(props.layoutType === 'editor' && breakIndex > 0) &&<CaretLeft size='22'/>}
                  {(props.layoutType === 'render' && breakIndex > 0) &&<CaretRight size='22'/>}
                  {(props.layoutType === 'split' && breakIndex > 0) &&<LayoutSplit size='18'/>}
              </Button>
            
          </Flex>
          }


        </Flex>

        {/* right aligned default buttons */}
        <Flex mr={0}>
          
          <ThemeToggle />
          <NavMenu 
            appInstallStatus={appInstallStatus} 
            showSettingsModal={props.showSettingsModal} 
            showLoad={props.showLoad}
            
            />

        </Flex>
      </Box>








      {/* empty box used for extra margin for fixed nav */}
      <Box
        sx={{
          mt: props.fixed ? 8 : 0,
        }}
      ></Box>
      
    </>
  );
});
export default Navbar;

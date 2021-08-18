import { useEffect, useState, useRef } from "react";
import {useRouter} from 'next/router'
import MDX from "@mdx-js/runtime";

import {CaretLeft} from '@emotion-icons/boxicons-regular/CaretLeft'
import {CaretRight} from '@emotion-icons/boxicons-regular/CaretRight'
import { Flex, Box, Button, Progress } from "theme-ui";
import gsap from 'gsap'

import getHaloLocation from "../lib/haloLocation";

//===============================================================================================================================
const Halo = ({ loc }) => {
  // loc.exist && console.log(loc)
  const REF_HALO = useRef()

  
  
  
  // useEffect(()=>{
  //   console.log(`HALO | lo`)
  //     let tl = gsap.timeline({repeat: -1, repeatDelay: 0});
  //     tl.to([REF_HALO.current], { duration: 1, repeat: -1,  outlineOffset: '0px', ease: 'Power1.easeInOut'})
  //     setTimeout(() => {
        
  //       tl.pause()
  //     }, 1000);
      
  //     return () => tl.pause()
  // }, [loc.l, loc.t])


  return (
    <Box
    ref={REF_HALO}
    onClick={e=>{e.preventDefault(), e.stopPropagation()}}
      sx={{
        position: "absolute",
        display: 'block',
        zIndex: 10000,
        borderRadius: ".5rem",
        opacity: loc.exist ? "1" : ".2",
        border: "3px solid",
        borderColor: "red",
        width: `${loc.w}px`,
        height: `${loc.h}px`,
        top: `${loc.t}px`,
        left: `${loc.l}px`,
        boxShadow: "0 0 10000px 10000px rgba(130,130,130,.8)",
        transition: "all .5s, opacity .2s",
        // outline: '3px solid',
        // outlineOffset: '100px',
        // outlineColor: 'primary_b',
        // transition: '.5s'
        pointerEvents: 'none'
      }}
    />
  );
};

//===============================================================================================================================
const HaloGuide = (props) => {

const haloList = [
{ // step 0
id: "",
marg: 0,
name: "Walkthrough Guide",
content: 
`#### Welcome to MD Editor!

Use the next and back buttons to navigate through the steps and learn more about the editor and its features!`,
},
{ // step 1
id: "halo-0",
marg: 0,
name: "Editor",
content: `
Use the text editor to modify content of the md file
`,
},
{ // step 2
id: "halo-1",
marg: 0,
name: "Renderer",
content: `The renderer will display the final result of the editors content, in `,
},
{ // step 3
id: "halo-2",
marg: 15,
name: "File Info",
content: `When using the editor, the navbar will display info about the currently active file. You can click on this to expand the file selection window.`,
},
{ // step 4
id: "halo-3",
marg: 20,
name: "File Selection",
move: '0, -40vh',
content: `When using the editor, the navbar will display info about the currently active file. You can click on this to expand the file selection window.`,
},
{ // step 5
id: "halo-4",
marg: 10,
name: "Files",
move: '0, -40vh',
content: `When using the editor, the navbar will display info about the currently active file. You can click on this to expand the file selection window.`,
},
{ // step 6
id: "halo-4",
marg: 10,
name: "File Details (halo-4)",
move: '0, -40vh',
content: ``,
},
{ // step 7
id: "halo-5",
marg: 10,
name: "File Name (halo-5)",
move: '0, -40vh',
content: ``,
},
{ // step 8
id: "halo-6",
marg: 10,
name: "File Description (halo-6)",
move: '0, -40vh',
content: ``,
},
{ // step 9
id: "halo-7",
marg: 10,
name: "Load File (halo-7)",
move: '0, -40vh',
content: ``,
},
{ // step 10
id: "halo-8",
marg: 10,
name: "Save File (halo-8)",
move: '0, -40vh',
content: ``,
},
{ // step 11
id: "halo-9",
marg: 10,
name: "Delete File (halo-9)",
move: '0, -40vh',
content: ``,
},
{ // step 12
id: "halo-10",
marg: 5,
name: "Switch View (halo-10)",
move: '0, 0',
content: ``,
},
{ // step 13
id: "halo-11",
marg: 5,
name: "Toggle Dark Mode (halo-11)",
move: '0, 0',
content: ``,
},
{ // step 14
id: "halo-12",
marg: 5,
name: "Open Menu (halo-12)",
move: '0, 0',
content: ``,
},
{ // step 15
id: "halo-13",
marg: 0,
name: "Settings Menu (halo-13)",
move: '0, -40vh',
content: `Settings can be opened from the main menu`,
},
{ // step 16
id: "halo-14",
marg: 0,
name: "Reset Settings (halo-14)",
move: '0, -40vh',
content: ``,
},
{ // step 17
id: "halo-15",
marg: 0,
name: "Close Settings (halo-15)",
move: '0, -40vh',
content: ``,
},


];














    // track the current step of the guide
    const [step, setStep] = useState(0);
    // move the guide window if its in the way of content
    const [guideLoc, setGuideLoc] = useState('0, 40vh');
    // hold the location of the halo
    const [haloLoc, setHaloLoc] = useState({
        exist: false,
        l: 0,
        t: 0,
        h: 0,
        w: 0,
    });
    // adjust teh shadow for the walkthrough card
    const [walkthroughShadow, setWalkthroughShadow] = useState('10px')

    const router = useRouter()

    // progress to the next step
    const nextStep = () => {
        // play any close function before moving on
        haloList[step].closeFunc && haloList[step].closeFunc()
        if (step < haloList.length - 1) {
          setStep(step + 1);
          router.push({query: {walkthrough: true, step: step + 1}})
        } else {
          setStep(0);
          router.push({query: {walkthrough: true, step: 0}})
        }
    };

    // go back to the previous step
    const lastStep = () => {
        // play any close function before moving on
        haloList[step].closeFunc && haloList[step].closeFunc()
        if (step > 0) {
          setStep(step - 1);
          router.push({query: {walkthrough: true, step: step - 1}})
        } else {
          setStep(haloList.length - 1);
          router.push({query: {walkthrough: true, step: haloList.length - 1}})
        }
    };

    // move the guide out of the way
    const handleMoveGuide = step => {
        let moved = haloList[step].move || null
        if(moved){
            setGuideLoc(moved)
        }else{
            setGuideLoc('0, 0')
        }
    }

    // write a func that continuously updates haloLoc
    let haloTimeout
    const updateHaloLoc = () => {
      const run = () => {
       
        // console.log(`run update halo location: ${step} ${haloList[step].id}`)
        
          haloTimeout = setTimeout(() => {
            setHaloLoc(getHaloLocation(haloList[step].id, haloList[step].marg));
            run()
          }, 250)
          
        
      }
      run()
    }
        

    useEffect(() => {
        // move the guide if its in the way
        handleMoveGuide(step)
        // pass id to halos
        // haloList[step].func && haloList[step].func();
        // move the guide after waiting a sec
        // setTimeout(() => {
        //     setHaloLoc(getHaloLocation(haloList[step].id, haloList[step].marg));
        // }, 500);
        clearTimeout(haloTimeout)
        updateHaloLoc()
        // maybe we could getHaloLoc a repeatedly and compare to old values of the halo, the update if diff
        // this way if screen size or loc changes the halo is still accurate

        // if at first step = set a large box-shadow on the card
        step === 0 ? setWalkthroughShadow('10000px') : setWalkthroughShadow('10px')

        
      return () => clearTimeout(haloTimeout)
    }, [step]);

    useEffect(()=>{
      if(router.query.step){
        setStep(parseInt(router.query.step))
      }
    }, [router.query])

  return (
    <>
      <Flex
        onClick={props.exit}
        sx={{
          position: "fixed",
          dispaly: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          height: "100vh",
          width: "100vw",
          top:'0px',
          zIndex: '1000000',
          pointerEvents: 'none',
          // bg:'green',
        }}
      >
        <Flex
        onClick={e=>e.stopPropagation()}
          sx={{
            m:4,
            flexDirection: "column",
            bg: "grey_0",
            width: "40rem",
            maxWidth: "90vw",
            height: "20rem",
            maxHeight: "20vh",
            borderRadius: 2,
            overflow: "hidden",
            transform: `translate(${guideLoc})`,
            boxShadow: `0 0 ${walkthroughShadow} ${walkthroughShadow} rgba(130,130,130,.8)`,
            transition: 'box-shadow .5s, transform .5s',
            pointerEvents: 'auto',
          }}
        >
          <Progress
            max={haloList.length}
            value={step}
            sx={{
              opacity: step === 0 ? "0" : "1",
              transition: ".3s",
              height: "1rem",
              borderRadius: 0,
            }}
          />



          <Flex
            sx={{
              p: 4,
              pt: 3,
              flexDirection: "column",
            }}
          >


            <Flex sx={{ 
                overflow: 'hidden', 
                justifyContent: 'space-between',
            }}>
              <Button px={4} onClick={props.exit}>
                EXIT
              </Button>
              <Box sx={{ textAlign: "center", fontSize: 4 }}>
                {haloList[step]?.name}
              </Box>
              <Flex>
                <Button
                  sx={{ px: 2, minWidth: "min-content" }}
                  onClick={lastStep}
                >
                  <CaretLeft size='22'/>
                </Button>
                <Button
                  sx={{ px: 2, minWidth: "min-content" }}
                  onClick={nextStep}
                >
                  <CaretRight size='22' />
                </Button>
              </Flex>
            </Flex>

            <MDX>{haloList[step]?.content}</MDX>
          </Flex>



        </Flex>
      </Flex>
      <Halo loc={haloLoc} />
    </>
  );
};

export default HaloGuide;

import { useEffect, useState, useRef } from "react";
import getHaloLocation from "../lib/haloLocation";
import MDX from "@mdx-js/runtime";
import {CaretLeft} from '@emotion-icons/boxicons-regular/CaretLeft'
import {CaretRight} from '@emotion-icons/boxicons-regular/CaretRight'

import { Flex, Box, Button, Progress } from "theme-ui";

//===============================================================================================================================
const Halo = ({ loc }) => {
  // console.log(`HALO | lo`)
  // loc.exist && console.log(loc)

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 10000,
        borderRadius: ".5rem",
        opacity: loc.exist ? "1" : ".2",
        border: "5px solid",
        borderColor: "primary_b",
        width: loc.w,
        height: loc.h,
        top: loc.t,
        left: loc.l,
        boxShadow: "0 0 1500px 1500px rgba(130,130,130,.8)",
        transition: "all .5s, opacity .2s",
      }}
    />
  );
};

//===============================================================================================================================
const HaloGuide = (props) => {

const haloList = [
{
id: "",
marg: 0,
name: "Walkthrough Guide",
content: 
`#### Welcome to MD Editor!

Use the next and back buttons to navigate through the steps and learn more about the editor and its features!`,
},
{
id: "halo-0",
marg: 0,
name: "Editor",
func: () => props.setLayout("split"),
content: `
Use the text editor to modify content of the md file
`,
},
{
id: "halo-1",
marg: 0,
name: "Renderer",
func: () => props.setLayout("split"),
content: `The renderer will display the final result of the editors content, in `,
},
{
id: "halo-2",
marg: 15,
name: "File Info",
// move: {align: 'flex-start', justify: 'flex-start'},
content: `When using the editor, the navbar will display info about the currently active file. You can click on this to expand the file selection window.`,
},
{
id: "halo-3",
marg: 0,
name: "File Selection",
func: () => props.openLoad(),
closeFunc: () => props.closeLoad(),
move: '0, -40vh',
content: `When using the editor, the navbar will display info about the currently active file. You can click on this to expand the file selection window.`,
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

    // progress to the next step
    const nextStep = () => {
        // play any close function before moving on
        haloList[step].closeFunc && haloList[step].closeFunc()
        if (step < haloList.length - 1) {
        setStep(step + 1);
        } else {
        setStep(0);
        }
    };

    // go back to the previous step
    const lastStep = () => {
        // play any close function before moving on
        haloList[step].closeFunc && haloList[step].closeFunc()
        if (step > 0) {
            setStep(step - 1);
        } else {
            setStep(haloList.length - 1);
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
    const updateHaloLoc = () => {
        
    }
        

    useEffect(() => {
        // move the guide if its in the way
        handleMoveGuide(step)
        // pass id to halos
        haloList[step].func && haloList[step].func();
        // move the guide after waiting a sec
        setTimeout(() => {
            setHaloLoc(getHaloLocation(haloList[step].id, haloList[step].marg));
        }, 500);
        // maybe we could getHaloLoc a repeatedly and compare to old values of the halo, the update if diff
        // this way if screen size or loc changes the halo is still accurate

    }, [step]);

  return (
    <>
      <Flex
        sx={{
          position: "fixed",
          justifyContent: 'center',
          alignItems: 'center',
          height: "100vh",
          width: "100vw",
          zIndex: 100000,
        }}
      >
        <Flex
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
            transition: 2,
            boxShadow: '0 0 10px 10px rgba(130,130,130,.5)'
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

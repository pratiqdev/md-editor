import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Button,
  Box,
  Flex,
  Grid,
  Text,
  Card,
  Switch,
  Label,
  Input,
  Textarea,
} from "theme-ui";

import * as SD from "../../lib/saveData";
import gsap from "gsap";

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";
import { AssistantDirection } from "@emotion-icons/material";

import * as FORMAT from '../../lib/format'
import { findIndex } from "lodash";












//* SAVE MODAL_______________________________________________________________________________________________
const SaveModal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    close: () => {
      handleClose();
    },
  }));

  //~ open and close handlers ______________________________________________________________________
  const REF_CARD = useRef(null);
  const REF_BOX = useRef(null);
  const REF_TITLE = useRef(null);

  const [localTrigger, setLocalTrigger] = useState(false);
  const [currentSD, setCurrentSD] = useState(false);




  const handleOpen = () => {
    openUpAnim();
  };

  const handleClose = () => {
    // props.triggerContent()
    closeDownAnim();
    setTimeout(() => {
      props.handleDeny ? props.handleDeny() : null;
      props.hideFunc ? props.hideFunc() : null;
    }, 300);
  };

  const openUpAnim = () => {
    gsap.to([REF_BOX.current], { opacity: 1, duration: 0.3 });
    gsap.to([REF_CARD.current], {
      opacity: 1,
      y: "0",
      delay: 0.2,
      duration: 0.3,
    });
    gsap.to([REF_TITLE.current], {
      scale: 2,
      delay: 0.2,
      opacity: 1,
      duration: 0.5,
    });
  };

  const closeDownAnim = () => {
    gsap.to([REF_CARD.current], { opacity: 1, y: "3rem", duration: 0.3 });
    gsap.to([REF_BOX.current], { opacity: 0, duration: 0.3 });
  };

  //~ accept / deny handlers _______________________________________________________________________
  const handleAccept = () => {
    // console.log(`accepted`)
    handleClose();
    props.handleAccept ? props.handleAccept() : null;
  };

  const handleDeny = () => {
    // console.log('denied')
    handleClose();
  };

  const handleSave = (i) => {    
    console.log(`SAVE | handleSave - currentIdForSave ${props.currentIdForSave}`);
    props.currentIdForSave === 'current' 
        ? SD.saveActiveFile() 
        : SD.saveFileById(props.currentIdForSave)


    setLocalTrigger(!localTrigger);
  };


  const handleSaveAsTemplate = () => {    
    console.log("SAVE | handleSaveAsTemplate ");
    SD.addNewTemplateWithContent(currentSD)
    SD.deleteById(props.currentIdForSave)
    handleClose()
  };

  //~ useEffect ____________________________________________________________________________________
  useEffect(() => {
    handleOpen()
    props.currentIdForSave === 'current' 
        ? SD.getActive().then((x) => setCurrentSD(x)) 
        : SD.getById(props.currentIdForSave).then(x=> setCurrentSD(x))
    
  });

  useEffect(() => {
    console.log("LOADMODAL | localTrigger");
  }, [localTrigger, SD]);

  //~ define the element ===========================================================================
  return (
    <Flex
      ref={REF_BOX}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        bg: "rgba(100,100,100,.8)",
        opacity: "0",
        zIndex: "1000",
      }}
      onClick={() => handleClose()}
    >
      {/* CARD ------------------------------------------*/}
      <Card
        variant="modal"
        id='halo-16'
        ref={REF_CARD}
        onClick={(e) => e.stopPropagation()}
        sx={{
          opacity: "0",
          p: [3, 4, 6],
          py: [4, 4, 6],
          transform: "translateY(3rem)",
          width: ["98vw", "auto", "auto"],
          minWidth: ["98vw", "40rem", "40rem"],
          maxWidth: "98vw",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "center",
        }}
      >
        {/* LOAD CONTENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

        <>
          {/* TITLE ------------------------------------------*/}
          <Box
            ref={REF_TITLE}
            sx={{
              color: "grey_0",
              fontSize: [1, 2, 3],
              fontWeight: "bold",
              color: "primary_b",
              fontFamily: "special",
            }}
          >
            Save File
          </Box>

          {/* SUBTITLE ------------------------------------------*/}
          <Box sx={{ color: "grey_10", mt: 3, mb: 6, fontSize: 2 }}>
            Save the current document to your machine
          </Box>

          {currentSD &&
          <>

          <Flex
            sx={{
              width: "80%",
              fontSize: 2,
              color: "grey_15",
              mb: 3,
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'grey_4',
            }}
          >
              <Box>
                Filename
              </Box>
              <Box>
                {currentSD.name}
              </Box>
          </Flex>


          <Flex
            sx={{
              width: "80%",
              fontSize: 2,
              color: "grey_15",
              mb: 3,
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'grey_4',
            }}
          >
              <Box>
                Created
              </Box>
              <Box>
                {currentSD.date}
              </Box>
          </Flex>


          <Flex
            sx={{
              width: "80%",
              fontSize: 2,
              color: "grey_15",
              mb: 3,
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'grey_4',
            }}
          >
              <Box>
                Last Edited
              </Box>
              <Box>
                {currentSD.edit}
              </Box>
          </Flex>



          <Flex
            sx={{
              width: "80%",
              fontSize: 2,
              color: "grey_15",
              mb: 3,
              justifyContent: 'space-between',
              borderBottom: '1px solid',
              borderColor: 'grey_4',
            }}
          >
              <Box>
                Lines / Words / Chars
              </Box>
              <Box>
              {FORMAT.numberWithCommas(currentSD.content.split(/\r|\n|\r\n/).length)}{' / '}
              {FORMAT.numberWithCommas(currentSD.content.trim().split(/\s+/).length)}{' / '} 
              {FORMAT.numberWithCommas(currentSD.content.length)}
              </Box>
          </Flex>
          </>
        }

    

    

          {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
          <Flex sx={{ mt: 6, width: "100%", flexDirection: 'column' }}>
            <Button
              variant="primary"
              sx={{ p: 2, minWidth: "6rem", mb:3, }}
              onClick={handleSave}
            >
              Save File
            </Button>

            <Flex sx={{alignItems: 'center', }}>
                <Button
                variant="outline.secondary"
                sx={{ p: 2, minWidth: "6rem", width: '100%', mr: 3}}
                onClick={handleDeny}
                >
                Cancel
                </Button>

                <Button
                variant="outline.secondary"
                sx={{ p: 2, minWidth: "6rem",  width: '100%'}}
                onClick={handleSaveAsTemplate}
                >
                Save as Template
                </Button>

            </Flex>
          </Flex>
        </>
      </Card>
    </Flex>
  );
});

export default SaveModal;

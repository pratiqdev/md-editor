import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useRouter } from 'next/router'
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

import * as ALERT from "../../lib/alert";
import * as SD from "../../lib/saveData";
import * as FORMAT from '../../lib/format'
import gsap from "gsap";

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";















const DeleteCard = props => {

    const REF_DELETE_CARD = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null)
  
    const openUpDeleteAnim = () => {
      gsap.to([REF_DELETE_CARD.current], {
        opacity: 1,
        y: "0",
        delay: 0.2,
        duration: 0.3,
      });
    };
  
    const closeDownDeleteAnim = () => {
      gsap.to([REF_DELETE_CARD.current], {
        opacity: 0,
        y: "3rem",
        duration: 0.3,
      });
    };
  
    const handleCancelDelete = (e) => {
      e.stopPropagation();
      closeDownDeleteAnim();
      setTimeout(() => {
        props.handleRemoveSelf()
  
        // handleClose() // dont close the parent modal when this action is complete
      }, 300);
    };
  
    const handleConfirmDelete = (e) => {
      e.stopPropagation();
      // ALERT.fileDeleted(SD.getById(currentIdForDelete).name); // removed because of change to return a promise
      SD.getTemplateById(props.currentIdForDelete).then(x=>ALERT.fileDeleted(x.name))
  
      SD.deleteTemplateById(props.currentIdForDelete);
    //   props.causeParentTrigger();
      // setLocalTrigger(!localTrigger);
  
      closeDownDeleteAnim();
      setTimeout(() => {
        props.handleRemoveSelf()
  
        // handleClose() // dont close the parent modal when this action is complete
      }, 300);
    };
  
    useEffect(()=>{
      console.log('DELETE CARD | useeffect -> openUpAnim')
      openUpDeleteAnim()
      SD.getTemplateById(props.currentIdForDelete).then(x=> setSelectedFile(x))
    }, [])
  
    return(
      <Card
            variant="modal"
            ref={REF_DELETE_CARD}
            sx={{
              position: "absolute",
              // width: '20rem',
              maxWidth: "90vw",
              // height: '10rem',
              bg: "grey_0",
              border: "2px solid",
              borderColor: "red",
              color: "red",
              transform: "translateY(3rem)",
              opacity: "0",
            }}
          >
            <Box sx={{ width: "100%", textAlign: "center", fontSize: [4, 6, 8] }}>
              DELETE TEMPLATE
            </Box>
            <Box
              sx={{
                color: "grey_15",
                fontWeight: "bold",
                textAlign: "center",
                m: 1,
              }}
            >
              {selectedFile?.name}
            </Box>
            <Box sx={{ color: "grey_15", textAlign: "center", m: 3, my: 6 }}>
              This will delete the selected template. This action is not reversible
            </Box>
            <Flex sx={{ justifyContent: "space-between", m: 3 }}>
              <Button variant="outline.primary" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button sx={{ bg: "red" }} onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Flex>
          </Card>
    )
  }
  
  














const TemplateItem = ({
    currentSD,
    currentIndex,
    handleActiveSwap,
    handleEdit,
    handleDelete,
    loadModalTrigger,
    causeSave,
    itemKey,
    causeParentTrigger,
    handleClose
  }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [newName, setNewName] = useState();
    const [newSum, setNewSum] = useState();
  
    const router = useRouter()
  
    const handleDetails = () => {
      setShowDetails(!showDetails);
    };
  
    const handleLoadTemplate = (e) => {
      e.stopPropagation();
    //   handleActiveSwap(currentIndex);
    SD.createNewWithContentAndActivate(currentSD)
    causeParentTrigger()
    handleClose()
    console.log('load this template')
    };
  
    const handleUpdateName = (e) => {
      setNewName(e.target.value);
      SD.updateTemplateNameByIndex(e.target.value, currentIndex);
    };
  
    const handleUpdateSum = (e) => {
      setNewSum(e.target.value);
      SD.updateTemplateSummaryByIndex(e.target.value, currentIndex);
    };
  
    const handleSave = (e) => {
      e.stopPropagation();
      causeSave(currentIndex)
    };
  
    useEffect(() => {
      setNewName(currentSD.name);
      setNewSum(currentSD.sum);
    });
  
    
    useEffect(()=>{
      switch(router.query.step){
  
        case '5': {setShowDetails(false)}break;
        case '6': {setShowDetails(true)}break;
        case '7': {setShowDetails(true)}break;
        case '8': {setShowDetails(true)}break;
        case '9': {setShowDetails(true)}break;
        case '10': {setShowDetails(true)}break;
        case '11': {setShowDetails(true)}break;
        case '12': {setShowDetails(false)}break;
  
  
      }
    }, [router.query])
  
    return (
      <Box
      id='halo-4'
        key={itemKey}
        sx={{
          border: "1px solid",
          borderColor: "grey_3",
          outline: "2px solid transparent",
          outlineColor: currentSD.active ? "primary_b" : "transparent",
          borderRadius: 2,
          bg: "grey_0",
          p: [2, 2, 2],
          m: 1,
          mb: 3,
        }}
      >
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            color: "grey_15",
          }}
        >
          <Flex sx={{ alignItems: "center", width: '100%', }}>
            {/* <Box sx={{fontSize: 3}}>{currentSD.name}</Box> */}
            <Button variant="icon.primary" onClick={handleDetails} sx={{ mr: 2 }}>
              {showDetails ? <CaretDown size="22" /> : <CaretRight size="22" />}
            </Button>
            <Box sx={{width: '100%'}}>
              <Input
              id='halo-5'
                value={newName}
                onChange={handleUpdateName}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  p: 0,
                  px:2,
                  fontSize: 3,
                  border: "0px solid",
                  cursor: "auto",
                  width: '100%',
                  minWidth: "2rem",
                  pointerEvents: showDetails ? 'auto' : 'none',
                  textOverflow: 'ellipsis',
                }}
              />
              <Box sx={{ fontSize: 1, color: "grey_10", textAlign: "left" }}>
                {currentSD.date}
              </Box>
            </Box>
          </Flex>
  
          <Flex>
              {/* {!showDetails &&
              <Button variant="outline.primary" onClick={handleSave} sx={{ mr: 3 }}>
                  Save
              </Button>
              } */}
            <Button id='halo-7' onClick={handleLoadTemplate}>Create</Button>
          </Flex>
        </Flex>
  
        {showDetails && (
          <Flex sx={{ flexDirection: "column" }}>
            <Flex
              sx={{
                justifyContent: 'space-between',
                borderBottom: "1px solid",
                fontSize: 1,
                borderColor: "grey_4",
                color: "grey_10",
                my: 1,
                pb: 1,
              }}
            >
              <Box>
               Last edited 
              </Box>
              <Box>
                {currentSD.edit}
              </Box>
            </Flex>
            <Flex
              sx={{
                justifyContent: 'space-between',
                borderBottom: "1px solid",
                fontSize: 1,
                borderColor: "grey_4",
                color: "grey_10",
                my: 1,
                pb: 1,
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
  
            <Textarea
              id='halo-6'
              value={newSum}
              onChange={handleUpdateSum}
              onClick={(e) => e.stopPropagation()}
              rows={8}
              sx={{
              //   p: 0,
                color: "grey_12",
                fontFamily: "body",
                fontSize: 2,
                cursor: "auto",
                maxHeight: "6rem",
                border: "0px solid",
                resize: 'false'
              }}
            />
  
            <Flex sx={{ mt: 4, justifyContent: "space-between" }}>
              <Button
                id='halo-9'
                variant="outline.secondary"
                sx={{ minWidth: "6rem", mr: 2 }}
                onClick={() => handleDelete(currentIndex)}
              >
                Delete
              </Button>
              <Button
              id='halo-8'
                variant="outline.primary"
                sx={{ minWidth: "6rem" }}
                onClick={handleSave}
              >
                Edit?
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    );
  };































const LoadTemplateModal = props => {


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null);
    const REF_BOX = useRef(null);
    const REF_TITLE = useRef(null);
    const [templates, setTemplates] = useState([])
    const [localTrigger, setLocalTrigger] = useState(false)
    const [currentIdForDelete, setCurrentIdForDelete] = useState(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  
    const handleOpen = () => {
      openUpAnim();
    };
  
    const handleClose = () => {
      // props.triggerContent()
      closeDownAnim();
      setTimeout(() => {
        props.handleRemoveSelf && props.handleRemoveSelf()
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
  
  
    const handleNew = () => {
      props.handleNew()
      handleClose()
    }
  
    // brought these from the settings modal and they need to be refactored to work with this modal
    const handleShowConfirmDelete = (givenId) => {
        console.log(`LOAD | show confirm delete for ${givenId}`)
        setCurrentIdForDelete(givenId);
        setShowDeleteConfirm(true);
    
      };
  
  
  
  
    //~ useEffect ____________________________________________________________________________________
    useEffect(() => {
      SD.getAllTemplates()
        .then(x=> setTemplates(x))
      handleOpen();
    });
  
  
  
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
          bg: "modal_t",
          opacity: "0",
          zIndex: "1000",
        }}
        onClick={() => handleClose()}
      >
        {/* CARD ------------------------------------------*/}
        <Card
          variant="modal"
          ref={REF_CARD}
          onClick={(e) => e.stopPropagation()}
          sx={{
            opacity: "0",
            p: 4,
            // py: [2,3,6],
            transform: "translateY(3rem)",
            width: ["98vw", "auto", "auto"],
            minWidth: ["98vw", "40rem", "40rem"],
            maxWidth: "98vw",
            minHeight: "30.4rem", // why?
            maxHeight: "80vh",
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
              File Templates
            </Box>
  
            {/* SUBTITLE ------------------------------------------*/}
            <Box sx={{ color: "grey_12", my: 3, fontSize: 3 }}>
              Create a new file using a template from the list
            </Box>
  

  
            <Box
              sx={{
                // height: '40rem',
                flex: 1,
                // maxHeight: '70vh',
                overflowY: "auto",
                // border: '1px solid',
                // borderColor: 'grey_4',
                borderRadius: 0,
                width: "100%",
                mb: 6,
                color: "grey_4",
                // p:2,
                textAlign: "center",
              }}
            >
                {templates.length === 0 && 
                <Flex sx={{color: 'grey_12', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Box sx={{fontSize: 4, mb:4}}>
                    No Templates Found
                    </Box>
                    <Box>
                    Create a file in the editor and save it as a template
                    </Box>
                </Flex>
                }
                
              {templates.map((x, i) => (
                   <TemplateItem
                   itemKey={x}
                   currentSD={x}
                   currentIndex={i}
                   handleDelete={handleShowConfirmDelete}
                   loadModalTrigger={localTrigger}
                   causeSave={props.causeSave}
                   causeParentTrigger={props.causeParentTrigger}
                   handleClose={handleClose}
                 />
              ))}
            </Box>
  
            {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
            <Flex sx={{ width: "100%", justifyContent: "space-between" }}>
              <Button
                variant="outline.secondary"
                sx={{ p: 2, width: '100%' }}
                onClick={handleClose}
              >
                Cancel
              </Button>
  
            </Flex>
          </>
        </Card>


        {showDeleteConfirm && 
      <DeleteCard 
        currentIdForDelete={currentIdForDelete}
        handleRemoveSelf={()=>setShowDeleteConfirm(false)}
        causeParentTrigger={props.causeParentTrigger}
        />
      }
  
          
      </Flex>
    );
  };
  
  
export default LoadTemplateModal  
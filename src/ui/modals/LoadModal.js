import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input, Textarea} from 'theme-ui'

import * as ALERT from '../../lib/alert'
import * as SD from '../../lib/save-version-4'
import gsap from 'gsap'



import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";







const LoadItem = ({currentSD, currentIndex, handleActiveSwap, handleEdit, handleDelete, loadModalTrigger, itemKey}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [newName, setNewName] = useState()
    const [newSum, setNewSum] = useState()

    const handleDetails = () => {
        setShowDetails(!showDetails)
    }

    const handleSwap = e => {
        e.stopPropagation()
        handleActiveSwap(currentIndex)
    }



    const handleUpdateName = e => {
        setNewName(e.target.value)
        SD.updateNameByIndex(e.target.value, currentIndex)
    }

    const handleUpdateSum = e => {
        setNewSum(e.target.value)
        SD.updateSummaryByIndex(e.target.value, currentIndex)
    }

    const handleSave = (e) => {
        e.stopPropagation()
        SD.saveFileById(currentIndex)
    }



    useEffect(()=>{
        setNewName(currentSD.name)
        setNewSum(currentSD.newSum)
    })

 

    




    return(
        <Box key={itemKey} sx={{border: '1px solid', borderColor: currentSD.active ? 'grey_15' : 'grey_3', borderRadius: 2, bg: 'grey_0', p: [2,3,3], m:1, mb:3}}>


        <Flex 

            sx={{alignItems: 'center', justifyContent: 'space-between', color: 'grey_15' }}>
            <Flex sx={{alignItems: 'center'}}>
                {/* <Box sx={{fontSize: 3}}>{currentSD.name}</Box> */}
                <Button
                variant='icon.primary' 
                onClick={handleDetails}
                sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Button>
                <Box>
                    <Input value={newName} onChange={handleUpdateName} onClick={e=>e.stopPropagation()} sx={{p:0,fontSize: 3, border: '0px solid', cursor: 'auto', width: 'auto', minWidth: '2rem'}}/>
                    <Box sx={{fontSize: 1, color: 'grey_10', textAlign: 'left'}}>{currentSD.date}</Box>
                </Box>
            </Flex>

            <Flex>
            <Button variant='outline.primary' onClick={handleSave} sx={{mr:3}}>Save</Button>
            <Button  onClick={handleSwap}>Load</Button>
            </Flex>

        </Flex>



                {showDetails && 
                    <Flex sx={{flexDirection: 'column'}}>

                    <Flex sx={{borderBottom: '1px solid', fontSize: 1, borderColor: 'grey_4', color: 'grey_10', my:1, pb: 1}}>
                        {currentSD.content.length} Characters
                    </Flex>

                        <Textarea value={newSum} onChange={handleUpdateSum} onClick={e=>e.stopPropagation()} rows={8} sx={{p:0, color: 'grey_12', fontFamily: 'body', fontSize: 2, cursor: 'auto',  maxHeight:'6rem',  border: '0px solid'}}/>

                        <Flex sx={{mt: 4, justifyContent: 'space-between'}}>
                            <Button variant='outline.secondary' sx={{minWidth: '6rem', mr: 2}} onClick={()=>handleDelete(currentIndex)}>Delete</Button>
                            <Button variant='outline.secondary' sx={{minWidth: '6rem'}} onClick={()=>console.log('create template from this file')}>Save as Template</Button>
                        </Flex>

                    </Flex>
                }


        </Box>
    )
}






















const LoadModal = props => {


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null)
    const REF_BOX = useRef(null)
    const REF_TITLE = useRef(null)
    const REF_DELETE_CARD = useRef(null)

    const [localTrigger, setLocalTrigger] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [currentIdForDelete, setCurrentIdForDelete] = useState()




    const handleOpen = () => {
        openUpAnim()
    }


    const handleClose = () => {
        // props.triggerContent()
        closeDownAnim()
        setTimeout(() => {
            props.handleDeny ? props.handleDeny() : null
            props.hideFunc ? props.hideFunc() : null
        }, 300);
    }

    const openUpAnim = () => {
        gsap.to([REF_BOX.current], {opacity: 1, duration: .3})
        gsap.to([REF_CARD.current],  {opacity: 1, y: '0', delay: .2, duration: .3})
        gsap.to([REF_TITLE.current], {scale: 2, delay: .2, opacity: 1, duration: .5})
    }
    
    const closeDownAnim = () => {
        gsap.to([REF_CARD.current], {opacity: 1, y: '3rem', duration: .3})
        gsap.to([REF_BOX.current],  {opacity: 0, duration: .3})
    }

    const openUpDeleteAnim = () => {
        gsap.to([REF_DELETE_CARD.current],  {opacity: 1, y: '0', delay: .2, duration: .3})
    }
    
    const closeDownDeleteAnim = () => {
        gsap.to([REF_DELETE_CARD.current], {opacity: 0, y: '3rem', duration: .3})
    }


    //~ accept / deny handlers _______________________________________________________________________
    const handleAccept = () => {
        // console.log(`accepted`)
        handleClose()
        props.handleAccept ? props.handleAccept() : null
    }

    const handleDeny = () => {
        // console.log('denied')
        handleClose()
    }



    const handleActiveSwap = givenId => {
        console.log(`handleActiveSwap: ${givenId}`)
            SD.setActiveById(givenId)
            setLocalTrigger(!localTrigger)
            props.causeParentTrigger()
            setTimeout(() => {
                handleClose()
            }, 500);
        console.log('LOADMODAL | handleActiveSwap')
        ALERT.fileLoaded(SD.getById(givenId).name)

    }


    // brought these from the settings modal and they need to be refactored to work with this modal
    const handleShowConfirmDelete = givenId => {
        setCurrentIdForDelete(givenId)
        // console.log('DELETE -> '+SD.getById(currentIdForDelete).name)
        setShowDeleteConfirm(true)
        setTimeout(() => {
            openUpDeleteAnim()
        }, 100);
    }


    const handleCancelDelete = (e) => {
        e.stopPropagation()
        closeDownDeleteAnim()
        setTimeout(() => {
            setShowDeleteConfirm(false)
        }, 300);
    }

    const handleConfirmDelete = (e) => {
        e.stopPropagation()
        ALERT.fileDeleted(SD.getById(currentIdForDelete).name)

        SD.deleteById(currentIdForDelete)
        props.causeParentTrigger()
        setLocalTrigger(!localTrigger)

        closeDownDeleteAnim()
        setTimeout(() => {
            setShowDeleteConfirm(false)
            // handleClose() // dont close the parent modal when this action is complete
        }, 300);
    }



    const handleNew = () => {
        console.log('LOADMODAL | handleNew ')

        SD.createNew()
        setLocalTrigger(!localTrigger)
        ALERT.fileCreated()
    }




    //~ useEffect ____________________________________________________________________________________
    useEffect(()=>{
        handleOpen()
    })

    useEffect(()=>{
        console.log('LOADMODAL | localTrigger')
    },[localTrigger, SD])


    //~ define the element ===========================================================================
    return(
        
        <Flex 
        ref={REF_BOX}
        sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'fixed',
            top:'0',
            left:'0',
            height: '100vh',
            width: '100vw',
            bg: 'rgba(100,100,100,.8)',
            opacity: '0',
            zIndex: '1000',

        }}
        onClick={()=>handleClose()}>

            {/* CARD ------------------------------------------*/}
            <Card variant='modal' 
            ref={REF_CARD}
            onClick={e=>e.stopPropagation()}
            sx={{
                opacity: '0',
                p: [3,4,6],
                py: [4,4,6],
                transform: 'translateY(3rem)',
                width: ['98vw', 'auto', 'auto'],
                minWidth: ['98vw', '40rem', '40rem'],
                maxWidth: '98vw',
                minHeight: '30.4rem',
                maxHeight: '40vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                alignItems: 'center'
                
            }}>


            {/* LOAD CONTENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
   
                <>

                    {/* TITLE ------------------------------------------*/}
                    <Box
                    ref={REF_TITLE} 
                    sx={{color: 'grey_0', fontSize: [1,2,3], fontWeight: 'bold', color: 'primary_b', fontFamily: 'special'}}>
                        Files
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Load, save or view a documents details.
                    </Box>

                    <Box sx={{
                        // height: '40rem',
                        flex: 1,
                        // maxHeight: '70vh',
                        overflowY: 'auto',
                        border: '1px solid',
                        borderColor: 'grey_4',
                        borderRadius: 2,
                        bg: 'grey_2',
                        width: '100%',
                        mb: 6,
                        color: 'grey_4',
                        p:2,
                        textAlign: 'center'
                    }}>
                        {SD.getAll().map((x, i) => 
                            <LoadItem 
                                itemKey={x}
                                currentSD={x} 
                                currentIndex={i} 
                                handleActiveSwap={handleActiveSwap}
                                handleDelete={handleShowConfirmDelete}
                                loadModalTrigger={localTrigger}
                                
                                />
                        )}
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={handleDeny}>Cancel</Button>
                        <Button variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={handleNew}>New</Button>
                    </Flex>
            </>



            





            </Card>

            {showDeleteConfirm && 
                <Card variant='modal'
                ref={REF_DELETE_CARD}
                sx={{
                    position: 'absolute',
                    // width: '20rem',
                    maxWidth: '90vw',
                    // height: '10rem',
                    bg: 'grey_0',
                    border: '2px solid',
                    borderColor: 'red',
                    color: 'red',
                    transform: 'translateY(3rem)',
                    opacity: '0',
                }}>
                    <Box sx={{width: '100%', textAlign: 'center', fontSize: [4,6,8]}}>DELETE FILE</Box>
                    <Box sx={{color: 'grey_15', fontWeight: 'bold', textAlign: 'center', m:1,}}>{SD.getById(currentIdForDelete).name}</Box>
                    <Box sx={{color: 'grey_15',  textAlign: 'center', m:3, my:6}}>This will delete the selected file. This action is not reversible</Box>
                    <Flex sx={{justifyContent: 'space-between', m:3}}>

                    <Button variant='outline.primary' onClick={handleCancelDelete}>Cancel</Button>
                    <Button sx={{bg:'red'}} onClick={handleConfirmDelete}>Delete</Button>
                    </Flex>

                </Card>
            }
        </Flex>
    )
}
export default LoadModal
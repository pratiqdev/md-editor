import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input} from 'theme-ui'

import * as SD from '../../lib/save-version-4'
import gsap from 'gsap'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";







const LoadItem = ({currentSD, currentIndex, handleActiveSwap, handleEdit, handleDelete}) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleSelection = () => {
        setTimeout(() => {
            setIsSelected(!isSelected)
        }, 200);
    }
    const handleSwap = e => {
        e.stopPropagation()
        handleActiveSwap(currentIndex)
    }



    return(
        <Box sx={{border: '1px solid', borderColor: currentSD.active ? 'grey_15' : 'grey_3', borderRadius: 2, bg: 'grey_0', p: [2,3,3], m:1, mb:3}}>
        <Flex 
            onClick={handleSelection}

            sx={{width: '100%',alignItems: 'center', justifyContent: 'space-between', color: 'grey_15' }}>
            <Flex sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Box sx={{fontSize: 2}}>{currentSD.name}</Box>
                <Box sx={{fontSize: 0}}>{currentSD.date}</Box>
            </Flex>


            <Button  onClick={handleSwap}>Load</Button>
            

        </Flex>

                {isSelected && 
                    <Flex sx={{flexDirection: 'column', borderTop: '1px solid', borderColor: 'grey_4', mt:3}}>
                        <Flex sx={{pt:1, fontSize: 2, color: 'grey_8'}}>
                            {currentSD.sum}
                        </Flex>


                        <Flex sx={{mt: 4}}>
                            <Button variant='outline.secondary' sx={{flex: 1, mr: 2}} onClick={()=>handleDelete(currentIndex)}>Delete</Button>
                            <Button variant='outline.secondary' sx={{flex: 1, mr: 2}} onClick={()=>handleEdit(currentIndex)}>Rename</Button>
                            <Button variant='outline.secondary' sx={{flex: 1}} onClick={()=>console.log('create template from this file')}>Save as Template</Button>
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

    const [localTrigger, setLocalTrigger] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [indexToEdit, setIndexToEdit] = useState(0)
    const [newSummary, setNewSummary] = useState('')
    const [newTitle, setNewTitle] = useState('')

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

    }

    const handleEdit = givenId => {
        setIsEditMode(true)
        setIndexToEdit(givenId)
        setNewTitle(SD.getById(givenId).name)
        setNewSummary(SD.getById(givenId).sum)
        console.log('LOADMODAL | handleEdit')

    }

    const handleDelete = givenId => {
        console.log('LOADMODAL | handleDelete')
        SD.deleteById(givenId)
        setLocalTrigger(!localTrigger)
    }

    const handleNew = () => {
        console.log('LOADMODAL | handleNew ')

        SD.createNew()
        setLocalTrigger(!localTrigger)
    }

    const handleUpdateInfo = () => {
        console.log('LOADMODAL | handleUpdateInfo ')

        SD.updateName(newTitle)
        SD.updateSummary(newSummary)
        setTimeout(() => {
            setIsEditMode(false)
        }, 200);
    }


    //~ useEffect ____________________________________________________________________________________
    useEffect(()=>{
        handleOpen()
    },[])


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
                transform: 'translateY(3rem)',
                width: ['98vw', 'auto', 'auto'],
                minWidth: ['98vw', '30rem', '30rem'],
            }}>


            {/* LOAD CONTENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {!isEditMode &&
                <Flex sx={{
                    p: [3,4,6],
                    py: [4,4,6],
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minWidth: ['90vw', 'auto', 'auto']
                }}>

                    {/* TITLE ------------------------------------------*/}
                    <Box
                    ref={REF_TITLE} 
                    sx={{color: 'grey_0', fontSize: [1,2,3], fontWeight: 'bold', color: 'primary_b', fontFamily: 'special'}}>
                        Load a Document
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Select and load a document.
                    </Box>

                    <Box sx={{
                        minHeight: '30vh',
                        maxHeight: '30vh',
                        overflowY: 'auto',
                        border: '1px solid',
                        borderColor: 'grey_3',
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
                                currentSD={x} 
                                currentIndex={i} 
                                handleActiveSwap={handleActiveSwap}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                
                                />
                        )}
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={handleDeny}>Cancel</Button>
                        <Button variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={handleNew}>New</Button>
                    </Flex>
            </Flex>
            }



            {/* EDIT CONTENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {isEditMode &&
                <Flex sx={{
                    p: [2,4,6],
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>

                    {/* TITLE ------------------------------------------*/}
                    <Box
                    ref={REF_TITLE} 
                    sx={{color: 'grey_0', fontSize: [1,2,3], fontWeight: 'bold', color: 'primary_b', fontFamily: 'special'}}>
                        Edit Document Info
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Input sx={{color: 'grey_6', my:6,
                    border: '1px solid',
                    borderColor: 'grey_3',
                    borderRadius: 2,
                    bg: 'grey_2',
                    width: '100%',
                    mb: 4,
                    color: 'grey_12',
                    p:2,
                    textAlign: 'center'
                    }} 
                    value={newTitle}
                    onChange={e=>setNewTitle(e.target.value)}
                    />

                    <Input sx={{
                        minHeight: '30vh',
                        maxHeight: '30vh',
                        overflowY: 'auto',
                        border: '1px solid',
                        borderColor: 'grey_3',
                        borderRadius: 2,
                        bg: 'grey_2',
                        width: '100%',
                        mb: 6,
                        color: 'grey_12',
                        p:2,
                        textAlign: 'center'
                    }}
                    value={newSummary}
                    onChange={e=>setNewSummary(e.target.value)}
                    />


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={()=>setIsEditMode(false)}>Cancel</Button>
                        <Button  sx={{p:2, minWidth: '6rem',}} onClick={handleUpdateInfo}>Update</Button>
                    </Flex>
            </Flex>
            }





            </Card>
        </Flex>
    )
}
export default LoadModal
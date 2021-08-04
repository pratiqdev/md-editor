import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input, Textarea} from 'theme-ui'

import * as ALERT from '../../lib/alert'
import * as SD from '../../lib/save-version-4'
import gsap from 'gsap'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";







const LoadItem = ({currentSD, currentIndex, handleActiveSwap, handleEdit, handleDelete, loadModalTrigger}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [newName, setNewName] = useState()
    const [newSum, setNewSum] = useState()

    const handleSelection = () => {
        setIsSelected(!isSelected)
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
        <Box sx={{border: '1px solid', borderColor: currentSD.active ? 'grey_15' : 'grey_3', borderRadius: 2, bg: 'grey_0', p: [2,3,3], m:1, mb:3, cursor: 'pointer'}}>
        <Flex 
            onClick={handleSelection}

            sx={{width: '100%',alignItems: 'center', justifyContent: 'space-between', color: 'grey_15' }}>
            <Flex sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                {/* <Box sx={{fontSize: 3}}>{currentSD.name}</Box> */}
                <Input value={newName} onChange={handleUpdateName} onClick={e=>e.stopPropagation()} sx={{p:0,fontSize: 3, border: '0px solid', cursor: 'auto', width: 'auto', minWidth: '2rem'}}/>
                <Box sx={{fontSize: 1, color: 'grey_10', cursor: 'pointer'}}>{currentSD.date}</Box>
            </Flex>

            <Flex>
            <Button variant='outline.primary' onClick={handleSave} sx={{mr:3}}>Save</Button>
            <Button  onClick={handleSwap}>Load</Button>
            </Flex>

        </Flex>

                {isSelected && 
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

    const [localTrigger, setLocalTrigger] = useState(false)



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



    const handleDelete = givenId => {
        console.log(`LOADMODAL | handleDelete - index: ${givenId}`)
        SD.deleteById(givenId)
        props.causeParentTrigger()
        setLocalTrigger(!localTrigger)
    }

    const handleNew = () => {
        console.log('LOADMODAL | handleNew ')

        SD.createNew()
        setLocalTrigger(!localTrigger)
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
                height: '40rem',
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
                                currentSD={x} 
                                currentIndex={i} 
                                handleActiveSwap={handleActiveSwap}
                                handleDelete={handleDelete}
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
        </Flex>
    )
}
export default LoadModal
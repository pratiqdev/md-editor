import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label} from 'theme-ui'

import { activeSaveData, getArrayOfSaveData, setActiveSaveData } from '../../lib/save'
import gsap from 'gsap'









const LoadItem = ({SD}) => {
    return(
        <Flex sx={{width: '100%', p:[1,2,2], border: '1px solid', borderColor: 'grey_4', mb:2 }}>
            <Flex sx={{width: '100%'}}>
            {SD.name}
            </Flex>
            <Flex sx={{width: '100%', fontSize: [0,1,1]}}>
            {SD.date}
            </Flex>
        </Flex>
    )
}






















const SaveModal = props => {


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null)
    const REF_BOX = useRef(null)
    const REF_TITLE = useRef(null)

    const handleOpen = () => {
        openUpAnim()
    }

    const handleClose = () => {
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
                width: ['98vw', 'auto', 'auto']
            }}>
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
                        Load a Document
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Select and load a document. This will abandon any unsaved changes.
                    </Box>

                    <Box sx={{
                        minHeight: '20vh',
                        border: '1px solid',
                        borderColor: 'grey_4',
                        borderRadius: 2,
                        bg: 'grey_1',
                        width: '100%',
                        mb: 6,
                        color: 'grey_4',
                        p:2,
                        textAlign: 'center'
                    }}>
                        {getArrayOfSaveData().map(SD => 
                            <LoadItem SD={SD} />
                        )}
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={handleDeny}>Cancel</Button>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem',}} >New</Button>
                        <Button sx={{p:2, minWidth: '6rem', flex:1}} onClick={handleAccept}>Load</Button>
                    </Flex>
            </Flex>
            </Card>
        </Flex>
    )
}
export default SaveModal
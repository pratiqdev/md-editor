import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input, Textarea} from 'theme-ui'

import * as SD from '../../lib/save-version-4'
import gsap from 'gsap'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";











const SaveModal = props => {


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null)
    const REF_BOX = useRef(null)
    const REF_TITLE = useRef(null)

    const [localTrigger, setLocalTrigger] = useState(false)
    const [currentSD, setCurrentSD] = useState({name:'Loading current file...'})
    const [saveFileAs, setSaveFileAs] = useState('File Name')


    const handleFileName = e => {
        setSaveFileAs(e.target.value)
        console.log('check if this file exists on the machine already')
    }


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






    const handleSave = () => {
        console.log('SAVE | handleSave ')

        // SD.createNew()
        setLocalTrigger(!localTrigger)
    }




    //~ useEffect ____________________________________________________________________________________
    useEffect(()=>{
        handleOpen()
        SD.getActive().then(x=>setCurrentSD(x))
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
                height: 'auto',
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
                        Save File
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Save the current document to your machine
                    </Box>

                    <Box sx={{width: '100%', textAlign: 'center', fontSize: 6, color:'grey_15', mb:6}}>File: {currentSD.name}</Box>

                    <Box sx={{width: '100%', textAlign: 'center', fontSize: 3, color:'grey_15', mb:2}}>Save file as</Box>

                    <Box sx={{
                        // height: '40rem',
                        flex: 1,
                        // maxHeight: '70vh',
                        overflowY: 'auto',
                        width: '100%',
                        mb: 6,
                        color: 'grey_15',
                        p:2,
                        textAlign: 'center'
                    }}>
                       
                    <Input value={saveFileAs} onChange={handleFileName}  />
                    </Box>

                    


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={handleDeny}>Cancel</Button>
                        <Button variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={handleSave}>Save</Button>
                    </Flex>
            </>



            





            </Card>
        </Flex>
    )
}
export default SaveModal
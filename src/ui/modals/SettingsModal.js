import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input} from 'theme-ui'

import * as SETTINGS from '../../lib/settings'
import gsap from 'gsap'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";







const LoadItem = ({currentSETTING, currentIndex, handleActiveSwap, handleEdit, handleDelete}) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleSelection = () => {
        setIsSelected(!isSelected)
    }
    const handleSwap = e => {
        e.stopPropagation()
        handleActiveSwap(currentIndex)
    }



    return(
        <Box sx={{border: '1px solid', borderColor:  'grey_3', borderRadius: 2, bg: 'grey_0', p: [1,2,2], m:1, mb:3}}>
        <Flex 
            onClick={handleSelection}

            sx={{width: '100%',alignItems: 'center', justifyContent: 'space-between', color: 'grey_15', p:2 }}>
           
                <Box sx={{width: '100%', textAlign: 'left', fontSize: 2, flex: 1 }}>{currentSETTING.name}</Box>
            <Box>
                <Switch id="enable-email-alerts" checked={currentSETTING.active}/>
            </Box>

        </Flex>

      
            
            



                {isSelected && 
                    <Flex sx={{flexDirection: 'column', borderTop: '1px solid', borderColor: 'grey_4', mt:3}}>
                        <Flex sx={{pt:1, fontSize: 1, color: 'grey_6'}}>
                           {currentSETTING.group}
                        </Flex>
                        <Flex sx={{pt:1, fontSize: 2, color: 'grey_10'}}>
                           {currentSETTING.desc}
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
            // SD.setActiveById(givenId)
            // setTrigger(!trigger)
            // props.triggerContent()
            
        // console.log('LOADMODAL | handleActiveSwap')

    }

    const handleEdit = givenId => {
        // setIsEditMode(true)
        // setIndexToEdit(givenId)
        // setNewTitle(SD.getById(givenId).name)
        // setNewSummary(SD.getById(givenId).sum)
        // console.log('LOADMODAL | handleEdit')

    }

  


    //~ useEffect ____________________________________________________________________________________
    useEffect(()=>{
        SETTINGS.init()
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
                        Settings                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Alter settings for the editor, renderer and app
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
                        {SETTINGS.getAll() && SETTINGS.getAll().map((x, i) => 
                            <LoadItem 
                                currentSETTING={x} 
                                currentIndex={i} 
                                handleActiveSwap={handleActiveSwap}
           
                                
                                />
                        )}
                      
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={()=>console.log('reset settings')}>Reset</Button>
                        <Button variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={()=>console.log('done with settings')}>Done</Button>
                    </Flex>
            </Flex>
            







            </Card>
        </Flex>
    )
}
export default LoadModal
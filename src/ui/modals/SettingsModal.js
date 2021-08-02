import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input} from 'theme-ui'

import * as SD from '../../lib/save-version-4'
import gsap from 'gsap'

import BooleanSwitch from '../settingItems/BooleanSwitch'
import OptionSwitch  from '../settingItems/OptionSwitch'
import NumberSwitch from '../settingItems/NumberSwitch'
import StringSwitch from '../settingItems/StringSwitch'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";
import { setSyntheticTrailingComments } from 'typescript';




    






















const LoadModal = props => {


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null)
    const REF_BOX = useRef(null)
    const REF_TITLE = useRef(null)

    const [settingsList, setSettingsList] = useState([])
    const [localTrigger, setLocalTrigger] = useState(false)

    const test = (i, val) => {
        SD.toggleSetting(i, val)
        setLocalTrigger(!localTrigger)
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
        SD.init()
        handleOpen()
        SD.getAllSettings()
            .then(x=>setSettingsList(x))
    })


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
                {/* <Flex sx={{
                    p: [3,4,6],
                    py: [4,4,6],
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minWidth: ['90vw', 'auto', 'auto']
                }}> */}

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


                        {settingsList.map((s, si) => {
                            switch(s.type){
                                case 'string': {return <StringSwitch s={s} si={si} handle={test}/>};break;
                                case 'number': {return <NumberSwitch s={s} si={si} handle={test}/>};break;
                                case 'array': {return <OptionSwitch s={s} si={si} handle={test} />};break;
                                case 'boolean': {return <BooleanSwitch s={s} si={si} handle={test} />};break;
                            }

                        }
                            // <LoadItem 
                            //     currentSETTING={x} 
                            //     currentIndex={i} 
                            //     handleActiveSwap={handleActiveSwap}
           
                                
                            //     />
                        )}
                      
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={()=>console.log('reset settings')}>Reset</Button>
                        <Button variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={handleClose}>Done</Button>
                    </Flex>
            </>
            







            </Card>
        </Flex>
    )
}
export default LoadModal
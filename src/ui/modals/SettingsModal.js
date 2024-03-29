import {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label, Input} from 'theme-ui'

import * as SD from '../../lib/saveData'
import gsap from 'gsap'

import BooleanSwitch from '../settingItems/BooleanSwitch'
import OptionSwitch  from '../settingItems/OptionSwitch'
import NumberSwitch from '../settingItems/NumberSwitch'
import StringSwitch from '../settingItems/StringSwitch'
import DualString from '../settingItems/DualString'
import BoolString from '../settingItems/BoolString'
import Snippets from '../settingItems/Snippets'

import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";
import { setSyntheticTrailingComments } from 'typescript';




    



















const SettingsModal = forwardRef((props, ref) => {

    useImperativeHandle(ref,() => ({
        close: () => {
            handleClose()
            } 
    }));  
      


    //~ open and close handlers ______________________________________________________________________
    const REF_CARD = useRef(null)
    const REF_BOX = useRef(null)
    const REF_TITLE = useRef(null)
    const REF_RESET_CARD = useRef(null)

    const [settingsList, setSettingsList] = useState([])
    const [localTrigger, setLocalTrigger] = useState(false)
    const [showResetConfirm, setShowResetConfirm] = useState(false)

    const test = (i, val) => {
        SD.toggleSetting(i, val)
        setLocalTrigger(!localTrigger)
    }

    const handleOpen = () => {
        openUpAnim()
    }

    const handleClose = () => {
        props?.causeParentTrigger && props.causeParentTrigger()
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


    const handleShowConfirmReset = () => {
        setShowResetConfirm(true)
        setTimeout(() => {
            openUpResetAnim()
        }, 100);
    }


    const handleCancelReset = (e) => {
        e.stopPropagation()
        closeDownResetAnim()
        setTimeout(() => {
            setShowResetConfirm(false)
        }, 300);
    }

    const handleConfirmReset = (e) => {
        e.stopPropagation()
        SD.resetAllSettingsToDefault()
            .then(()=>{
                // setLocalTrigger(!localTrigger)
                console.log('MODAL |setting trigger to cause update to UI')
            })
        closeDownResetAnim()
        setTimeout(() => {
            setShowResetConfirm(false)
            handleClose()
        }, 300);
    }


    const openUpResetAnim = () => {
        gsap.to([REF_RESET_CARD.current],  {opacity: 1, y: '0', delay: .2, duration: .3})
    }
    
    const closeDownResetAnim = () => {
        gsap.to([REF_RESET_CARD.current], {opacity: 0, y: '3rem', duration: .3})
    }






  


    //~ useEffect ____________________________________________________________________________________
    useEffect(()=>{
        handleOpen()
        SD.getAllSettings()
            .then(x=>setSettingsList(x))
            console.log('MODAL | LOCAL TRIGGER ONLY')
    }, [localTrigger])






    //~ define the element ===========================================================================
    return(
        
        <Flex 
        ref={REF_BOX}
        sx={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'fixed',
            display: 'block',
            top:'0',
            left:'0',
            height: '100vh',
            width: '100vw',
            bg: 'modal_t',
            opacity: '0',
            zIndex: '1000',

  

        }}
        onClick={()=>handleClose()}>

            {/* CARD ------------------------------------------*/}
            <Card variant='modal' 
            id='halo-13'
            ref={REF_CARD}
            onClick={e=>e.stopPropagation()}
            sx={{
                opacity: '0',
                p: 4,
                // py: [4,4,6],
                transform: 'translateY(3rem)',
                width: ['98vw', 'auto', 'auto'],
                minWidth: ['98vw', '40rem', '40rem'],
                maxWidth: '98vw',
                height: '40rem',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                alignItems: 'center'
            }}>


            {/* LOAD CONTENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
  

                    {/* TITLE ------------------------------------------*/}
                    <Box
                    ref={REF_TITLE} 
                    sx={{color: 'grey_0', fontSize: [1,2,3], fontWeight: 'bold', color: 'primary_b', fontFamily: 'special'}}>
                        Settings                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_12', my:3, fontSize: 3}}>
                        Alter settings for the editor, renderer and app
                    </Box>

                    <Box sx={{
                        position: 'relative', // added to prevent list from moving out of bounds of the parent on re-render
                        overflowY: 'auto',
                        borderColor: 'grey_4',
                        borderRadius: 0,
                        width: '100%',
                        mb: 6,
                        color: 'grey_4',
                        textAlign: 'center',
                        // border: '1px solid yellow'
                    }}>



                        {settingsList.map((s, si) => {
                            switch(s.type){
                                case 'string': {return <StringSwitch s={s} si={si} handle={test}/>};break;
                                case 'number': {return <NumberSwitch s={s} si={si} handle={test}/>};break;
                                case 'array': {return <OptionSwitch s={s} si={si} handle={test} />};break;
                                case 'boolean': {return <BooleanSwitch s={s} si={si} handle={test} />};break;
                                case 'bool-string': {return <BoolString s={s} si={si} handle={test} />};break;
                                case 'find-and-replace': {return <DualString s={s} si={si} handle={test} />};break;
                                case 'snippets': {return <Snippets s={s} si={si} handle={test} />};break;
                            }

                        }
               
                        )}
                      
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button id='halo-14' variant='outline.secondary' sx={{p:2, minWidth: '6rem', }} onClick={handleShowConfirmReset}>Reset</Button>
                        <Button id='halo-15' variant='outline.primary' sx={{p:2, minWidth: '6rem',}} onClick={handleClose}>Done</Button>
                    </Flex>
            







            </Card>
            {showResetConfirm && 
                <Card variant='modal'
                ref={REF_RESET_CARD}
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
                    <Box sx={{width: '100%', textAlign: 'center', fontSize: [4,6,8]}}>RESET TO DEFAULT</Box>
                    <Box sx={{color: 'grey_15',  textAlign: 'center', m:3, my:6}}>This will reset all settings to their default. Are you sure you want to continue?</Box>
                    <Flex sx={{justifyContent: 'space-between', m:3}}>

                    <Button variant='outline.primary' onClick={handleCancelReset}>Cancel</Button>
                    <Button sx={{bg:'red'}} onClick={handleConfirmReset}>Reset</Button>
                    </Flex>

                </Card>
            }
        </Flex>
    )
}) 
export default SettingsModal
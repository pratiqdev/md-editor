import {useState, useEffect, useRef} from 'react'
import {Button, Box, Flex, Grid, Text, Card, Switch, Label} from 'theme-ui'
import {TweenMax} from 'gsap'






const ModalType1 = props => {


    //* open and close handlers ______________________________________________________________________
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
        TweenMax.to([REF_BOX.current], .3, {opacity: 1})
        TweenMax.to([REF_CARD.current], .3, {opacity: 1, y: '0', delay: .2})
        TweenMax.to([REF_TITLE.current], .5, {scale: 2, delay: .2, opacity: 1})
    }
    
    const closeDownAnim = () => {
        TweenMax.to([REF_CARD.current], .3, {opacity: 1, y: '3rem'})
        TweenMax.to([REF_BOX.current], .3, {opacity: 0})
    }


    //* accept / deny handlers _______________________________________________________________________
    const handleAccept = () => {
        // console.log(`accepted`)
        handleClose()
        props.handleAccept ? props.handleAccept() : null
    }

    const handleDeny = () => {
        // console.log('denied')
        handleClose()
    }


    //* useEffect ____________________________________________________________________________________
    useEffect(()=>{
        handleOpen()
    },[])


    //* define the element ===========================================================================
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
                transform: 'translateY(3rem)'
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
                    sx={{color: 'grey_0', fontSize: 3, fontWeight: 'bold', color: 'primary_b', fontFamily: 'special'}}>
                        Settings
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:6}}>
                        Change settings and themes of the editor and render
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
                        No settings yet
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:2, minWidth: '14rem'}} onClick={handleDeny}>Reset defaults</Button>
                        <Button sx={{p:2, minWidth: '14rem'}} onClick={handleAccept}>Apply settings</Button>
                    </Flex>
            </Flex>
            </Card>
        </Flex>
    )
}
export default ModalType1
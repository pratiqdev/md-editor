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
            props.hideFunc()
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
        console.log(`accepted`)
        handleClose()
    }

    const handleDeny = () => {
        console.log('denied')
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
                        Install the App
                    </Box>

                    {/* SUBTITLE ------------------------------------------*/}
                    <Box sx={{color: 'grey_6', my:7}}>
                        Stay up to date! Sign up for notifications and emails when new content is published or a new version of the site becomes available
                    </Box>


                    
                    {/* ACCEPT / DENY BUTTONS ------------------------------------------*/}
                    <Flex sx={{width: '100%', justifyContent: 'space-between'}}>
                        <Button variant='outline.secondary' sx={{p:4, minWidth: '14rem'}} onClick={handleDeny}>No, thanks</Button>
                        <Button sx={{p:4, minWidth: '14rem'}} onClick={handleAccept}>Keep me up to date!</Button>
                    </Flex>
            </Flex>
            </Card>
        </Flex>
    )
}
export default ModalType1
import {useState, useEffect, useRef} from 'react'
import {Flex, Box, Card, Input, Switch, Button, Select, Textarea} from 'theme-ui'
import * as ALERT from '../../lib/alert'
import * as SD from '../../lib/save-version-4'

import gsap from 'gsap'

import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CloseOutline as Close } from "@emotion-icons/evaicons-outline/CloseOutline";


//! Create a new component that can handle both strings and update only the changed string from the array of objects
const Strings = ({o, oi, handleInner, handleRemove}) => {

    const [showDetails, setShowDetails] = useState(false)
    const [newActive, setNewActive] = useState(o.active)    // is this item active
    const [newName, setNewName] = useState(o.name)          // name used for snippet shortcut
    const [newCode, setNewCode] = useState(o.code)    // code used for snippet code
    const [newTitle, setNewTitle] = useState(o.title)        // title used for settings menu
    const [newDesc, setNewDesc] = useState(o.description)   // desc used for settings menu

    const handleActive = e => {
        o.active = !newActive
        handleInner(oi, o)
        setNewActive(!newActive)
    }

    const handleTitle = e => {
        o.title = e.target.value
        handleInner(oi, o)
        setNewTitle(e.target.value)
    }



    const handleDesc = e => {
        o.description = e.target.value
        handleInner(oi, o)
        setNewDesc(e.target.value)
    }

    const handleName = e => {
        o.name = e.target.value
        handleInner(oi, o)
        setNewName(e.target.value)
    }

    const handleCode = e => {
        o.code = e.target.value
        handleInner(oi, o)
        setNewCode(e.target.value)
    }




  






    
    
    
    return(
        <Flex sx={{flexDirection: 'column', width: 'auto', mx:2, mt: 2, py:2, bg: 'grey_2', }}>
                <Flex sx={{width: '100%', alignItems: 'center', fontSize: 2, }}>
                <Button
                variant='icon.primary' 
                onClick={()=>setShowDetails(!showDetails)}
                sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Button>
                {`${oi}: `}
                    <Input 
                        placeholder={`Condition ${oi}`} 
                        sx={{
                            height: '1.6rem', 
                            width: '100%', 
                            fontSize: 2, 
                            mx: 2, 
                            mb:0,
                            border: '0px solid',
                            textOverflow: 'ellipsis'
                        }} 
                        value={newTitle} 
                        onChange={handleTitle}
                    />

                    <Button variant='icon.primary' onClick={() => handleRemove(oi)} ><Close size='20' /></Button>
                    <Box sx={{minWidth: '3rem'}}>
                        <Switch checked={newActive} onChange={handleActive}/>
                    </Box>
                </Flex>


                {showDetails && 
                    <Box sx={{width: 'auto', mx:2, }}>


                        <Textarea 
                            placeholder='replace' 
                            rows='2'
                            sx={{ 
                                fontFamily: 'body', 
                                fontSize: 0, 
                                color: 'grey_10',
                                borderRadius: 2, 
                                width: '100%', 
                                height: 'auto',
                                borderColor: 'transparent', 
                                mb:1,
                            }} 
                            value={newDesc} 
                            onChange={handleDesc}
                        />
                        <Box sx={{
                            bg: 'grey_0',
                            border: '1px solid',
                            borderColor: 'grey_8',
                            borderRadius: 2,
                            overflow: 'hidden',
                            mb:2,
                        }}>

                            <Input 
                                placeholder='find'  
                                sx={{
                                    height: '1.6rem', 
                                    width: '100%', 
                                    fontSize: 1, 
                                    borderColor: 'transparent', 
                                    borderRadius: 0,


                                }} 
                                value={newName} 
                                onChange={handleName}
                            />
                            <Textarea 
                                placeholder='replace' 
                                rows='4'
                                sx={{ 
                                    fontFamily: 'body', 
                                    fontSize: 1, 
                                    borderRadius: 1, 
                                    width: '100%', 
                                    height: 'auto',
                                    borderColor: 'transparent',  
                                    borderTopColor: 'grey_8',
                                    borderRadius: 0,
                                }} 
                                    value={newCode} 
                                    onChange={handleCode}
                                />
                        </Box>

                    </Box>
                }
                

            

            

        </Flex>
    )
}



const Snippets = ({s, si, handle}) => {
    const REF_REMOVE_CARD = useRef(null)

    const [showDetails, setShowDetails] = useState(false)
    const [newGlobalActive, setNewGlobalActive] = useState(s.state[0])
    const [trigger, setTrigger] = useState(false)
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
    const [currentIdForRemove, setCurrentIdForRemove] = useState(false)

    const handleGlobalActive = () => {
        s.state[0] = !newGlobalActive
        handle(si, s.state)
        setNewGlobalActive(!newGlobalActive)
        // console.log('state', s)
    }

    const handleInner = (index, vals) => {
        s.state[index] = vals
        // console.log(s.state)
        handle(si, s.state)
    }

    const handleNewCondition = () => {
        SD.addNewSnippet()
        setTrigger(!trigger)
    }




    const handleShowConfirmRemove = (givenId) => {
        setCurrentIdForRemove(givenId)
        setShowRemoveConfirm(true)
        setTimeout(() => {
            openUpRemoveAnim()
        }, 100);
    }



    const handleCancelRemove = (e) => {
        e.stopPropagation()
        closeDownRemoveAnim()
        setTimeout(() => {
            setShowRemoveConfirm(false)
        }, 300);
    }

    const handleConfirmRemove = (e) => {
        e.stopPropagation()

        SD.removeSnippetById(currentIdForRemove)
        
        closeDownRemoveAnim()
        setTrigger(!trigger)
        setTimeout(() => {
            setShowRemoveConfirm(false)
        }, 300);
    }


    const openUpRemoveAnim = () => {
        gsap.to([REF_REMOVE_CARD.current],  {opacity: 1, y: '0', delay: .2, duration: .3})
    }
    
    const closeDownRemoveAnim = () => {
        gsap.to([REF_REMOVE_CARD.current], {opacity: 0, y: '3rem', duration: .3})
    }

 



   return(

        <Flex sx={{
            width: '100%', 
            flexDirection: 'column', 
            border: '1px solid', 
            color: 'grey_15', 
            bg: 'grey_0',
            mb:2, 
            p:1, 
            py: 2,
            
            borderColor: 'transparent',
            '&:hover':{
                borderColor: 'grey_15'
            }
            }}
            >

            <Flex sx={{alignItems: 'center'}}>

            <Flex sx={{width: '100%', alignItems: 'center', justifyContent: 'space-between'}} >
                <Flex sx={{alignItems: 'center'}}>
                    <Button
                    variant='icon.primary'
                    onClick={()=>setShowDetails(!showDetails)}
                    sx={{mr:2}}>
                        {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                    </Button>
                    <Box sx={{
                        borderBottom: '1px solid', 
                        borderColor: showDetails ? 'grey_8' : 'transparent',
                        cursor: 'default',
                    }}>
                        {s.name}
                    </Box>
                </Flex>

                <Box sx={{minWidth: '3rem'}}>
                    <Switch checked={newGlobalActive} onChange={handleGlobalActive}/>
                </Box>

            </Flex>

            
            
            
            
            </Flex>
          


            {showDetails && 
            <>
            <Box sx={{color: 'grey_10', p:2, mx:2, cursor: 'default'}}>
                <Flex sx={{fontSize: 1}}>
                    {s.group}
                </Flex>
                <Flex sx={{fontSize: 2, textAlign: 'left'}}>
                    {s.desc}
                </Flex>
            </Box>


            
            
            {
                s.state.map((o, oi)=>{
                    if(typeof o === 'object'){
                        return <Strings 
                                    o={o} 
                                    oi={oi} 
                                    handleInner={handleInner}
                                    handleRemove={handleShowConfirmRemove}
                                />
                    }
                        
                })
            }
            <Button variant='outline.primary' sx={{mx:2, mt:4, mb:2}} onClick={handleNewCondition}>Add a find/replace condition</Button>
            </>
            }


            {showRemoveConfirm && 
                <Card variant='modal'
                ref={REF_REMOVE_CARD}
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
                    <Box sx={{width: '100%', textAlign: 'center', fontSize: [4,6,8]}}>REMOVE CONDITION</Box>
                    <Box sx={{color: 'grey_15',  textAlign: 'center', m:2,}}>name or id</Box>
                    <Box sx={{color: 'grey_15',  textAlign: 'center', m:3, my:6}}>This will remove this condition from the list. Are you sure you want to continue?</Box>
                    <Flex sx={{justifyContent: 'space-between', m:3}}>

                    <Button variant='outline.primary' onClick={handleCancelRemove}>Cancel</Button>
                    <Button sx={{bg:'red'}} onClick={handleConfirmRemove}>Remove</Button>
                    </Flex>

                </Card>
            }

        </Flex>
   )
}

export default Snippets
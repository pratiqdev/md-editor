import {useState, useEffect, useRef} from 'react'
import {Flex, Box, Input, Switch, Button, Select, Textarea} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";
import * as ALERT from '../../lib/alert'


//! Create a new component that can handle both strings and update only the changed string from the array of objects
const Strings = ({
                    indexOfValuePairsInOptionsArray,  // get the index of this set of values from the options array [{find: '', replace: ''}, {}, {}, ...]
                    handleInnerUpdateThenOuterUpdate,  // update this value pair into the options array with the new values, then update the whole array in settings
                    findVal,
                    replaceVal,
                    o, // the entire option 
                    oi, // the index from the map function
                }) => {

    const [newFind, setNewFind] = useState(findVal)
    const [newReplace, setNewReplace] = useState(replaceVal)

    //! should also add an 'active' bool to the find/replace array so that individual sets can be disabled/enabled


    
    
    
    return(
        <Flex sx={{flexDirection: 'column', width: '100%', mr: 2}}>
            <Box sx={{textAlign: 'left', mt: 2, ml:2}}>Condition {oi}</Box> {/* dont add 1 to oi because first value is boolean*/}
            <Input placeholder='find'  sx={{height: '1.6rem', width: 'auto', fontSize: 1, mx: 2}} value={newFind} onChange={(e)=>handleChange(si, e)}/>
            <Textarea placeholder='replace' sx={{ fontFamily: 'body', fontSize: 1, borderRadius: 1, m:2, width: 'auto', borderColor: 'grey_6', '&:focus':{borderColor:'grey_6'}}} value={newReplace} onChange={(e)=>handleChange(si, e)}/>
        </Flex>
    )
}



const DualString = ({s, si, handle}) => {
    const REF_SMALL_INPUT = useRef(null)
    const REF_LARGE_INPUT = useRef(null)

    const [showDetails, setShowDetails] = useState(false)
    const [newValue, setNewValue] = useState(s.state)
    const [useLargeInput, setUseLargeInput] = useState(false)
    const [cursor, setCursor] = useState(0)
    const [isFocused, setIsFocused] = useState(false)

    const handleChange = (si, e) => {
        const { selectionStart, selectionEnd, value } = e.target;
        setCursor({start: selectionStart, end: selectionEnd})
        if(s.min <= value.length && value.length <= s.max){

            setNewValue(value)
            // handle(si, value)
            // checkInputDims(value)
            
        }else{
            ALERT.minMaxAlert(s.min, s.max)
        }
    }

 



   return(

        <Flex sx={{
            width: '100%', 
            flexDirection: 'column', 
            border: '1px solid #444', 
            color: 'grey_15', 
            bg: 'grey_0',
            mb:2, 
            p:1, 
            py: 2,
            cursor: 'pointer',
            }}
            >

            <Flex sx={{alignItems: 'center'}}>

            <Flex sx={{width: '100%',alignItems: 'center'}} >

                <Button
                variant='icon.primary'
                onClick={()=>setShowDetails(!showDetails)}
                sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Button>
                <Box sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid', 
                    borderColor: showDetails ? 'grey_8' : 'transparent'
                    }}>
                        DualString: {s.name}
                </Box>

            </Flex>

            
            
            
            
            </Flex>
          


            {showDetails && 
            <>
            <Box sx={{color: 'grey_10', p:2}}>
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
                        return <Strings o={o} oi={oi} findVal={o.find} replaceVal={o.replace} />
                    }
                        
                })
            }
            <Button variant='outline.primary' sx={{mx:2}}>Add a find/replace condition</Button>
            </>
            }

        </Flex>
   )
}

export default DualString
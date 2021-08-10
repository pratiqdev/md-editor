import {useState, useEffect, useRef} from 'react'
import {Flex, Box, Input, Switch, Button, Select, Textarea} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";
import * as ALERT from '../../lib/alert'




const StringSwitch = ({s, si, handle}) => {
    const REF_SMALL_INPUT = useRef(null)
    const REF_LARGE_INPUT = useRef(null)

    const [showDetails, setShowDetails] = useState(false)
    const [newValue, setNewValue] = useState(s.state)

    const handleChange = (si, e) => {
        const { selectionStart, selectionEnd, value } = e.target;
        if(s.min <= value.length && value.length <= s.max){

            setNewValue(value)
            handle(si, value)
            
        }else{
            ALERT.minMaxAlert(s.min, s.max)
        }
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
            cursor: 'pointer',
            borderColor: 'transparent',
            '&:hover':{
                borderColor: 'grey_15'
            }
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
                        {s.name}
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


                <Textarea ref={REF_LARGE_INPUT} sx={{ fontFamily: 'body', fontSize: 1, borderRadius: 1, m:2, width: 'auto', borderColor: 'grey_6', '&:focus':{borderColor:'grey_6'}}} value={newValue} onChange={(e)=>handleChange(si, e)}/>
            </>
            }
        </Flex>
   )
}

export default StringSwitch
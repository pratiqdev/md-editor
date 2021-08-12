import {useState, useEffect, useRef} from 'react'
import {Flex, Box, Input, Switch, Button, Select, Textarea} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";
import * as ALERT from '../../lib/alert'




const StringSwitch = ({s, si, handle}) => {
    const REF_SMALL_INPUT = useRef(null)
    const REF_LARGE_INPUT = useRef(null)

    const [showDetails, setShowDetails] = useState(false)
    const [newValue, setNewValue] = useState(s.state[1])
    const [newBool, setNewBool] = useState(s.state[0])

    const handleValue = (si, e) => {
        const { selectionStart, selectionEnd, value } = e.target;
        if(s.min <= value.length && value.length <= s.max){
            setNewValue(value)
        }else{
            ALERT.minMaxAlert(s.min, s.max)
        }
        updateValue()
    }

    const handleBool = () => {
        setNewBool(!newBool)
        handle(si, [!newBool, newValue])
    }


    const updateValue = () => {
        handle(si, [newBool, newValue])
    }

 


   return(

        <Flex sx={{
            width: '100%', 
            flexDirection: 'column', 
            color: 'grey_15', 
            bg: 'grey_0',
            p:1, 
            py: 2,
            border: '1px solid transparent', 
            borderLeft: '3px solid transparent', 
            borderLeftColor: showDetails ? 'primary_b' : 'transparent',
            borderBottomColor: 'grey_2',
            '&:hover':{
                bg: 'grey_2'
            }
            }}
            >



            <Flex sx={{width: '100%',alignItems: 'center', justifyContent: 'space-between'}} onClick={()=>setShowDetails(!showDetails)}>
                <Flex sx={{alignItems: 'center'}}>

                    <Button
                    variant='icon.primary' 
                    onClick={()=>setShowDetails(!showDetails)}
                    sx={{mr:2}}>
                        {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                    </Button>
                    <Box sx={{
                        cursor: 'default',
                        borderBottom: '1px solid', 
                        borderColor: showDetails ? 'grey_8' : 'transparent'
                        }}>
                            {s.name}
                    </Box>
                </Flex>



            <Box sx={{minWidth: '3rem'}}>
                <Switch checked={newBool} onChange={handleBool}/>
            </Box>

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


                <Textarea ref={REF_LARGE_INPUT} sx={{ fontFamily: 'body', fontSize: 1, borderRadius: 1, m:2, width: 'auto', borderColor: 'grey_6', '&:focus':{borderColor:'grey_6'}}} value={newValue} onChange={(e)=>handleValue(si, e)}/>
            </>
            }
        </Flex>
   )
}

export default StringSwitch
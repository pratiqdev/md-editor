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
    const [useLargeInput, setUseLargeInput] = useState(false)
    const [cursor, setCursor] = useState(0)

    const handleChange = (si, e) => {
        const { selectionStart, selectionEnd, value } = e.target;
        setCursor({start: selectionStart, end: selectionEnd})
        if(s.min <= value.length && value.length <= s.max){

            setNewValue(value)
            handle(si, value)
            
            if(value.length >= 20){
                setUseLargeInput(true)
            }else{
                setUseLargeInput(false)             
            }
        }else{
            ALERT.minMaxAlert(s.min, s.max)
        }
    }

    useEffect(()=>{
        if(useLargeInput){
            REF_LARGE_INPUT.current.focus()
            REF_LARGE_INPUT.current.selectionStart = cursor.start
            REF_LARGE_INPUT.current.selectionEnd = cursor.end
        }else{
            REF_SMALL_INPUT.current.focus()
            REF_SMALL_INPUT.current.selectionStart = cursor.start
            REF_SMALL_INPUT.current.selectionEnd = cursor.end
        }
    }, [useLargeInput])

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
            }}>

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

            {!useLargeInput && 
            <Box sx={{width: '14rem', mr: 2}}>
                <Input placeholder={s.default === '' ? 'none' : s.default} ref={REF_SMALL_INPUT} sx={{height: '1.6rem', fontSize: 1,}} value={newValue} onChange={(e)=>handleChange(si, e)}/>
            </Box>
            }
            
            </Flex>
          


            {showDetails && 
            <Box sx={{color: 'grey_10', p:2}}>
                <Flex sx={{fontSize: 1}}>
                    {s.group}
                </Flex>
                <Flex sx={{fontSize: 2}}>
                    {s.desc}
                </Flex>
            </Box>
            }

            {useLargeInput &&
                <Textarea ref={REF_LARGE_INPUT} sx={{ fontFamily: 'body', fontSize: 1, borderRadius: 1, m:2, width: 'auto', borderColor: 'grey_6', '&:focus':{borderColor:'grey_6'}}} value={newValue} onChange={(e)=>handleChange(si, e)}/>
            }
        </Flex>
   )
}

export default StringSwitch
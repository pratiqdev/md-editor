import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button, Select} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";
import * as ALERT from '../../lib/alert'


const NumberSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [newValue, setNewValue] = useState(s.state)

    const reg = /[^0-9]/g
    const handleChange = (si, val) => {
        if(!val.match(reg)){
            setNewValue(val)
            handle(si, parseInt(val))
        }else{
            ALERT.nan(val)
        }
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
            }}>

            <Flex sx={{alignItems: 'center'}}>

            <Flex sx={{width: '100%', alignItems: 'center'}} >

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
            <Box sx={{width: '14rem', mr: 2}}>
                {/* <Switch checked={s.state} onChange={()=>handle(si, !s.state)}/> */}
                <Input placeholder={s.default} sx={{height: '1.8rem', p: 2, fontSize: [1,1,1]}} value={newValue} onChange={(e)=>handleChange(si, e.target.value)}/>
            </Box>
            </Flex>
            {showDetails && 
            <Box sx={{color: 'grey_10', p:2}}>
                <Flex sx={{fontSize: 1}}>
                    {s.group}
                </Flex>
                <Flex sx={{fontSize: 2, textAlign: 'left'}}>
                    {s.desc}
                </Flex>
            </Box>
            }
        </Flex>
   )
}

export default NumberSwitch
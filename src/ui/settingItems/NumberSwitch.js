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
            ALERT.nanAlert(val)
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
                    cursor: 'pointer',
                    borderBottom: '1px solid', 
                    borderColor: showDetails ? 'grey_8' : 'transparent'
                    }}>
                        {s.name}
                </Box>

            </Flex>
            <Box sx={{width: '14rem', mr: 2}}>
                {/* <Switch checked={s.state} onChange={()=>handle(si, !s.state)}/> */}
                <Input placeholder={s.default} sx={{height: '1.6rem', fontSize: 1}} value={newValue} onChange={(e)=>handleChange(si, e.target.value)}/>
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
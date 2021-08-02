import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button, Select} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";


const StringSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [newValue, setNewValue] = useState(s.state)

    const handleChange = (si, val) => {
        setNewValue(val)
        handle(si, val)
    }
   return(

        <Flex sx={{
            width: '100%', 
            flexDirection: 'column', 
            border: '1px solid #444', 
            color: 'grey_15', 
            bg: 'grey_0',
            mb:2, 
            p:2, 
            py: 3,
            cursor: 'pointer',
            }}>

            <Flex sx={{alignItems: 'center'}}>

            <Flex sx={{width: '100%',}} onClick={()=>setShowDetails(!showDetails)}>

                <Box sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Box>
                <Box sx={{
                    cursor: 'pointer',
                    borderBottom: '1px solid', 
                    borderColor: showDetails ? 'grey_8' : 'transparent'
                    }}>
                        {s.name}
                </Box>

            </Flex>
            <Box sx={{width: '100%', mr: 1}}>
                {/* <Switch checked={s.state} onChange={()=>handle(si, !s.state)}/> */}
                <Input value={newValue} onChange={(e)=>handleChange(si, e.target.value)}/>
            </Box>
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
        </Flex>
   )
}

export default StringSwitch
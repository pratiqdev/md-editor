import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button, Select} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";


const BooleanSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
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

            <Flex sx={{width: '100%',alignItems: 'center',}} onClick={()=>setShowDetails(!showDetails)}>

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
            <Box sx={{minWidth: '3rem'}}>
                <Switch checked={s.state} onChange={()=>handle(si, !s.state)}/>
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

export default BooleanSwitch
import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button, Select} from 'theme-ui'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";


const OptionSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

    const closeAndHandle = (si, newState) => {
        setShowOptions(!showOptions)
        handle(si, newState)
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
            py: 3
            }}>

            <Flex sx={{alignItems: 'center'}}>

                <Flex sx={{width: '100%'}} onClick={()=>setShowDetails(!showDetails)}>
                    <Box sx={{mr:2}}>
                        {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                    </Box>
                    <Box sx={{borderBottom: '1px solid', borderColor: showDetails ? 'grey_8' : 'transparent'}}>{s.name}</Box>
                </Flex>
                <Button 
                    variant='outline.primary' 
                    sx={{whiteSpace: 'nowrap', fontWeight: 'body', overflow: 'hidden', width: '100%'}} 
                    onClick={()=>setShowOptions(!showOptions)}>
                        {s.options[s.state]}
                </Button>
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
            {showOptions &&
            <Box sx={{m:2, mr:3}}>

                    {s.options.map((x, i)=>
                        <Button 
                            onClick={()=>closeAndHandle(si, i)}
                            variant='plain' 
                            sx={{bg: s.state === i ? 'grey_4' : 'grey_1', 
                            width: '100%', 
                            mb:1, 
                            textAlign: 'left'
                        }}>
                            {x}
                        </Button>
                    )}

            </Box>
            }

        </Flex>
   )
}

export default OptionSwitch
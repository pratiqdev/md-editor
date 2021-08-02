import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button, Select} from 'theme-ui'
import * as SD from '../src/lib/save-version-4'
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";




const BooleanSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
   return(

        <Flex sx={{width: '100%', flexDirection: 'column', border: '1px solid #444', mb:2, p:2, py: 3}}>
            <Flex sx={{alignItems: 'center'}}>
            <Flex sx={{width: '100%'}} onClick={()=>setShowDetails(!showDetails)}>
                <Box sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Box>
                <Box sx={{borderBottom: '1px solid', borderColor: showDetails ? 'grey_8' : 'transparent'}}>{s.name}</Box>
            </Flex>
            <Box>
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



const OptionSwitch = ({s, si, handle}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [showOptions, setShowOptions] = useState(false)

   return(

        <Flex sx={{width: '100%', flexDirection: 'column', border: '1px solid #444', mb:2, p:2, py: 3}}>
            <Flex sx={{alignItems: 'center'}}>
            <Flex sx={{width: '100%'}} onClick={()=>setShowDetails(!showDetails)}>
                <Box sx={{mr:2}}>
                    {showDetails ? <CaretDown size='22' /> : <CaretRight size='22'/>}
                </Box>
                <Box sx={{borderBottom: '1px solid', borderColor: showDetails ? 'grey_8' : 'transparent'}}>{s.name}</Box>
            </Flex>
                <Button 
                    variant='outline.secondary' 
                    sx={{whiteSpace: 'nowrap'}} 
                    onClick={()=>setShowOptions(!showOptions)}>
                        {s.options[1]}
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
                        <Button variant='plain' sx={{bg: s.state === i ? 'grey_8' : 'grey_2', width: '100%', mb:1, textAlign: 'left'}}>{x}</Button>
                        )}

            </Box>
            }

        </Flex>
   )
}






const dataTypes = () => {
    const [result, setResult] = useState('Run a test')
    const [trigger, setTrigger] = useState(false)
    const [settings, setSettings] = useState(false)

    const test = (i, val) => {
        setResult(SD.toggleSetting(i, val))
        setTrigger(!trigger)
    }

    useEffect(()=>{
            
            console.log('running useEffect to get settings')
            SD.getAllSettings()
            .then(x=>{
                setSettings(x)
                console.log('got settings!')
            })
            .catch(err=>console.log(`couldnt get settings: ${err}`))
    })





    return(
        <div style={{padding: '2em', background: '#111', height: '100vh', color: 'white'}}>
            <h2>Data Types</h2>
            


            <Flex sx={{m:8, width: '40rem', flexDirection: 'column'}}> 

            {
                settings && settings.map((s, si)=>
                    <>
                        


                        {s.type === 'string' &&
                            <Input value={s.state} onChange={(e)=>test(si, e.target.value)}/>
                        }

                        {s.type === 'number' &&
                            <Input value={s.state} />
                        }

                        {s.type === 'boolean' &&
                            // <Switch checked={s.state} onChange={()=>test(si, !s.state)}/>
                            <BooleanSwitch s={s} si={si} handle={test} />
                        }

                        {s.type === 'array' &&
                            // <Box>
                            //     {s.options.map((x, i)=>
                            //         <Box sx={{bg: s.state === i ? 'grey_8' : 'grey_2'}}>{x}</Box>    
                            //     )}
                            // </Box>
                            <OptionSwitch s={s} si={si} handle={test} />
                        }
                    
                    
                    </>
                )
            }
            </Flex>

            



        </div>
    )
}
export default dataTypes

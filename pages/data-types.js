import {useState, useEffect} from 'react'
import {Flex, Box, Input, Switch, Button} from 'theme-ui'
import * as SD from '../src/lib/save-version-4'

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
            


            <div>{result}</div>

            {
                settings && settings.map((s, si)=>
                    <Flex sx={{p:2, border: '1px solid white'}}>
                        {s.name}


                        {s.type === 'string' &&
                            <Input value={s.state} onChange={(e)=>test(si, e.target.value)}/>
                        }

                        {s.type === 'number' &&
                            <Input value={s.state} />
                        }

                        {s.type === 'boolean' &&
                            <Switch checked={s.state} onChange={()=>test(si, !s.state)}/>
                        }

                        {s.type === 'array' &&
                            <Box>
                                {s.options.map((x, i)=>
                                    <Box sx={{bg: s.state === i ? 'grey_8' : 'grey_2'}}>{x}</Box>    
                                )}
                            </Box>
                        }
                    
                    
                    </Flex>
                )
            }

            



        </div>
    )
}
export default dataTypes

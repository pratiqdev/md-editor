import {useEffect, useState, useRef} from 'react'
import getHaloLocation from '../lib/haloLocation'

import {Flex, Box, Button, Progress } from 'theme-ui'



const haloList = [
    {
        id: 'halo-0',
        marg: 0,
        name: 'The editor',
        content: `Here is some content!`
    },
    {
        id: 'halo-1',
        marg: 0,
        name: 'the renderer',
        content: `Here is some content!`
    },
    {
        id: 'halo-2',
        marg: 15,
        name: 'file info',
        content: `Here is some content!`
    }
]

//________________________________________________________________________________________________________
const Halo = ({loc}) => {
    // console.log(`HALO | lo`)
    // loc.exist && console.log(loc)

    return(
        <Box sx={{
            position: 'absolute', 
            zIndex: 10000, 
            borderRadius: '.5rem', 
            opacity: loc.exist ? '1' : '.2',
            border: '5px solid',
            borderColor: 'primary_b', 
            width: loc.w, 
            height: loc.h,
            top: loc.t,
            left: loc.l, 
            boxShadow: '0 0 100px 100px rgba(100,100,100,.8)'
              }} 
        />
    )
}

//________________________________________________________________________________________________________
const HaloGuide = () => {
    const [step, setStep] = useState(0)
    const [haloLoc, setHaloLoc] = useState({
        exist: false,
        l:0,
        t:0,
        h:0,
        w:0
    })

    const nextStep = () => {
        if(step < haloList.length - 1){ setStep(step + 1)}
        else{setStep(0)}
           
    }

    useEffect(()=>{
        // pass id to halos
            setHaloLoc( 
                getHaloLocation(
                    haloList[step].id, 
                    haloList[step].marg
                    ) 
                )
        
      }, [step])


    return(
        <>
        <Flex sx={{
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            zIndex: 100000
        }}>
            <Flex sx={{flexDirection: 'column', bg: 'grey_0', width: '40rem', maxWidth: '60vw', height: '20rem', maxHeight: '20vh', p:4}}>

                <Box sx={{flex: 1}}>
                    {haloList[step]?.name}
                </Box>
                <Flex sx={{justifyContent: 'space-between'}}>
                    <Button onClick={nextStep}>BACK</Button>
                    <Button onClick={nextStep}>NEXT</Button>
                </Flex>
            </Flex>

        </Flex>
        <Halo loc={haloLoc} />
        </>
    )
}

export default HaloGuide

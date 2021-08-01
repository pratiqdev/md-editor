import {useEffect, useState} from 'react'
 
import * as SD from '../src/lib/save-version-4'

const SdTest = () => {
    const [status, setStatus] = useState('Not started yet')


    


    useEffect(()=>{
        SD.init()
        setStatus(`Initialized SD`)
    })









    return(
        <div style={{padding: '2em', background: '#111', height: '100vh', color: 'white'}}>

            {status}

        </div>
    )
}
export default SdTest

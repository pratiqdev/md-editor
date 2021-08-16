import {useEffect, useState} from 'react'
import { version } from '../package.json'


/** Test if the current version in the browser is the latest and show a message about updating to the latest version with a built in cache clean and refresh function */
const V_CHECK = () => {
    return new Promise((resolve, reject) => {

        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            // cant check for version yet
            if(!V_TEST_FINISHED){
                setTimeout(() => {
                    VERSION_CHECK()
                }, 3000);
            }
        }else{
            get('MDE_VERSION', version)
                .then(()=>{
                    resolve()
                    console.log(`SD | V_CHECK | `)
                    IS_AVAIL = true
                })
                .catch((err)=>{
                    console.log(`SD | CHECK_AVAIL | SD is NOT available... ${err}`)
                    IS_AVAIL = false
                    ALERT_STATUS()
                    return reject()
                })
        }
    })
  
}

const TestPage = () => {
    const [vTestStatus, setVTestStatus] = useState()

    useEffect(()=>{
        V_CHECK().then((x)=>{
            console.log(x)
        })
        .catch(err => {
            console.log(err)
        })
    })

    return(
        <div>Version Test</div>
    )
}
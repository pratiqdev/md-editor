import {useEffect, useState} from 'react'
import { version } from '../package.json'
import { get, set} from 'idb-keyval'
import semver from 'semver'

import toasty from '../src/lib/toasty'



const UPGRADE_VERSION = () => {
    // reset first_time so users are prompted after upgrade
    set('MDE_FIRST_USE', true)
}
/** Test if the current version in the browser is the latest and show a message about updating to the latest version with a built in cache clean and refresh function */
const V_CHECK = () => {



    const currentVersion = (v) => {
        // setTimeout(() => {
        toasty({
            text: `MDE version ${v}`,
            type: 'special',
            time: 3000,
            closeAnyway: true
        })
        // }, 1000);
    }
    
    const newVersionAvailable = (old_v, new_v) => {
        // setTimeout(() => {
        toasty({
            text: `Using new version ${new_v}! Check the changelog for new features and functions`,
            type: 'special',
            time: 20000,
            dismiss: {
                text: `Maybe later`,
            },
            agree: {
                text: `View the changelog`,
                func: () => {console.log('CHANGELOG!!')}
            },
            closeAnyway: true
        })
        // }, 1000);
    }

    
        const IN_MEM_V_KEY = 'MDE_VERSION'

        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            // cant check for version yet
            if(!V_TEST_FINISHED){
                setTimeout(() => {
                    VERSION_CHECK()
                }, 3000);
            }
        }else{
            get(IN_MEM_V_KEY)
                .then((IN_MEM_V)=>{
                    // resolve(`version found in mem: ${x}`)
                    if(!IN_MEM_V){
                        // no version set in memory yet
                        console.log('no version set yet')
                        set('MDE_FIRST_USE', true)
                        set(IN_MEM_V_KEY, version)
                        .then(x=>{
                            console.log(`set new version for first time: ${version}`)
                        })
                    }else{
                        // use npm semantic version comparison
                        semver.gte(IN_MEM_V,version) ? currentVersion(version) : newVersionAvailable(IN_MEM_V, version)
                    }
                })
                .catch((err)=>{
                    console.log(`SD | V_CHECK | SD is NOT available... ${err}`)
                })
        }
  
}

const TestPage = () => {

    useEffect(()=>{
        V_CHECK()
    })

    return(
        <>
        <div>Version Test</div>
        <div>v {version}</div>
        </>
    )
}

export default TestPage
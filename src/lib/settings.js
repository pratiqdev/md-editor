import { SETTINGS } from '@emotion-icons/material'
import {get, set} from 'idb-keyval'
import moment from 'moment'
import toasty from './toasty'
import settingList from './settingList'
import {debounce} from 'lodash'




//= Variables
//~ ___________________________________________________________________________________________________________________________________

let SETTINGS_ARRAY = []

export let IS_AVAIL = false
let INIT_ALERT_NUM = 0

// console.log(`SETTING LIST ------------`, settingList)




//= Private Functions
//~ ___________________________________________________________________________________________________________________________________
   
const CHECK_AVAIL = () => { 
    return new Promise((resolve, reject) => {
        
        
        
        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            IS_AVAIL = false 
        }else{
            set('IDBKV_SETTING_TEST', 'test_value')
                .then(()=>{
                    resolve()
                })
                .catch((err)=>{
                    console.log(`TEST FAILED: ${err}`)
                })
        }
    })
  
}




/** Every few seconds - save the new data to localStorage */
const SAVE_TO_DISK = () => {
    if(!IS_AVAIL){console.log('SAVE_TO_DISK not available'); return false}

    set('MD_EDITOR_SETTINGS', SETTINGS_ARRAY)
        .then(()=>console.log('saved to disk!'))
        .catch(err=>console.log(`no local storage: ${err}`))
 
}







/** If array is empty, create an intro file from the template */
const START_FRESH = () => {
    if(!IS_AVAIL){console.log('START_FRESH not available');return false}


    if(SETTINGS_ARRAY.length === 0){

        SETTINGS_ARRAY = settingList


        SAVE_TO_DISK()
    }
    
}
    
    





    
/** Initialize the SETTINGS object and load data from memory, or create new object and save to memory if it does not exist */
const INITIALIZE = () => {
    if(!IS_AVAIL){console.log('INITIALIZE not available');return false}

    get('MD_EDITOR_SETTINGS')
        .then(x=>{
            if(x && x.length !== 0){
                SETTINGS_ARRAY = x
            }else{
                console.log('creating SETTINGS from template')
                START_FRESH()
            }
        })
        .catch(err=>{
            console.log(`data not available...${err}`)
        })
                    
}























    








//= Public Functions
//~ ___________________________________________________________________________________________________________________________________



    /** Initialize the SETTINGS object and load data from memory, or create new object and save to memory if it does not exist */
    export const init = () => {
        CHECK_AVAIL()
            .then(()=>{
                IS_AVAIL = true
                INITIALIZE()
            })
            .catch(()=>{
                
                IS_AVAIL = false 
                
                // only alert the user once about failed storage
                if(INIT_ALERT_NUM === 0){
                    INIT_ALERT_NUM++
                    toasty({
                        type: 'error',
                        text: 'Save data not available! Are you incognito!? View the docs for more info',
                        closeAnyway: true,
                        time: '10000',
                        agree: {
                            text: 'View Docs',
                            func: () => location.replace('/docs')
                        },
                        dismiss: {
                            text: 'Report Issue',
                            func: () => location.replace('https://github.com/pratiqdev/md-editor/issues')
                        }
                    })
                }
            })
    }

    








    //! GET /////////////////////////////////////////////////////////////////////////////////

    /** Get the entire SETTINGS_ARRAY  */
    export const getAll = () => {
        if(!IS_AVAIL){console.log('getAll not available');return false}
        return SETTINGS_ARRAY
    }






    /** Save the content to the current active SETTINGS object  */
    export const updateContent = debounce((val) => {
        if(!IS_AVAIL){console.log('updateContent not available');return false}
        getActive().content = val
        SAVE_TO_DISK()
    },
    1000,
    { leading: true, trailing: true, maxWait: 5000 }
    );








// createNew = .createNew.bind(SETTINGS);

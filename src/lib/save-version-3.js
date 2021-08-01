import { Sd } from '@emotion-icons/material'
import {get, set} from 'idb-keyval'
import moment from 'moment'
import toasty from './toasty'
import intro from './intro'
import {debounce} from 'lodash'




//= Variables
//~ ___________________________________________________________________________________________________________________________________

let SD_ARRAY = []

export let IS_AVAIL = false
let INIT_ALERT_NUM = 0

let MOMENT_FORMAT = "dddd, MMMM Do, h:mm:ss a"





//= Private Functions
//~ ___________________________________________________________________________________________________________________________________
   
const CHECK_AVAIL = () => { 
    return new Promise((resolve, reject) => {
        
        
        
        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            IS_AVAIL = false 
        }else{
            set('IDBKV_TEST', 'test_value')
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

    set('MD_EDITOR_SD', SD_ARRAY)
        .then(()=>console.log('saved to disk!'))
        .catch(err=>console.log(`no local storage: ${err}`))
 
}







/** If array is empty, create an intro file from the template */
const START_FRESH = () => {
    if(!IS_AVAIL){console.log('START_FRESH not available');return false}

    let date = moment().format(MOMENT_FORMAT)

    if(SD_ARRAY.length === 0){

        SD_ARRAY.push({
            active: true, // is the current file active
            name: `Intro File`, // the short name used as the title
            sum: 'A simple intro to this application', // a short summary used in the load document selection window
            date: `${date}`, // the date of creation
            edit: `${date}`, // the date of the last edit
            content: intro, // the content of the document
        })
        SAVE_TO_DISK()
    }
    
}
    
    





    
/** Initialize the SD object and load data from memory, or create new object and save to memory if it does not exist */
const INITIALIZE = () => {
    if(!IS_AVAIL){console.log('INITIALIZE not available');return false}

    get('MD_EDITOR_SD')
        .then(x=>{
            if(x && x.length !== 0){
                SD_ARRAY = x
            }else{
                console.log('creating SD from template')
                START_FRESH()
            }
        })
        .catch(err=>{
            console.log(`data not available...${err}`)
        })
                    
}























    








//= Public Functions
//~ ___________________________________________________________________________________________________________________________________



    /** Initialize the SD object and load data from memory, or create new object and save to memory if it does not exist */
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

    //! CHECK DATA /////////////////////////////////////////////////////////////////////////////////

    export const getNumberOfDocuments = () => {
        if(!IS_AVAIL){console.log('getNumberOfDocuments not available');return false}
            return SD_ARRAY.length || 0  
    }

    /** Create a new document with the default object */
    export const createNew = () => {
        if(!IS_AVAIL){console.log('createNew not available');return false}

    
        let date = moment().format("dddd, MMMM Do, h:mm:ss a")
        let num = getNumberOfDocuments() + 1
    
        SD_ARRAY.push({
            active: false, // is the current file active
            name: `New File ${num}`, // the short name used as the title
            sum: 'A new file', // a short summary used in the load document selection window
            date: `${date}`, // the date of creation
            edit: `${date}`, // the date of the last edit
            content: `New File ${num}
Created ${date}
            `, // the content of the document
        })
        SAVE_TO_DISK()
        
    }








    //! GET /////////////////////////////////////////////////////////////////////////////////

    /** Get the entire SD_ARRAY  */
    export const getAll = () => {
        if(!IS_AVAIL){console.log('getAll not available');return false}
        return SD_ARRAY
    }

    /** Get a single element of the SD_ARARY by id  */
    export const getById = (id) => {
        if(!IS_AVAIL){console.log('getById not available');return false}

        if(SD_ARRAY && SD_ARRAY.length !== 0){
            return getAll()[id]
        }else{
            createNew()
            setActiveById(0)
            return SD_ARRAY[0]
        }
    }

    /** Return the SD object that is currently active  */
    export const getActive = () => {
        if(!IS_AVAIL){console.log('getActive not available');return false}

        if(SD_ARRAY && SD_ARRAY.length !== 0){
            return SD_ARRAY.find(x => x.active)
        }
        // else{
        //     START_FRESH()
        //     // console.log('WAS CALLING CREATE NEW HERE')
        //     setActiveById(0)
        //     return SD_ARRAY[0]
        // }
    }




    //! UPDATE /////////////////////////////////////////////////////////////////////////////////
    
    /** Set the selected SD object to active by index */
    export const setActiveById = (givenId) => {
        if(!IS_AVAIL){console.log('setActiveById not available');return false}


        SD_ARRAY.forEach((x, i) => {
            if(givenId === i){
                x.active = true
            }else{
                x.active = false
            }
        })
        SAVE_TO_DISK()
    }

    /** Save the content to the current active SD object  */
    export const updateContent = debounce((val) => {
        if(!IS_AVAIL){console.log('updateContent not available');return false}
        getActive().content = val
        SAVE_TO_DISK()
    },
    1000,
    { leading: true, trailing: true, maxWait: 5000 }
    );

    /** Save the summary to the current active SD object  */
    export const updateSummary = (val) => {
        if(!IS_AVAIL){console.log('updateSummary not available');return false}        
        getActive().sum = val
        SAVE_TO_DISK()
    }

    /** Save the name to the current active SD object  */
    export const updateName = (val) => {
        if(!IS_AVAIL){console.log('updateName not available');return false}
        getActive().name = val
        SAVE_TO_DISK()
    }






    //! DELETE  /////////////////////////////////////////////////////////////////////////////////

    /** Delete the setlected SD object by id   */
    export const deleteById = (givenId) => {
        if(!IS_AVAIL){console.log('deleteById not available');return false}
        SD_ARRAY.splice(givenId, 1);
        if(!SD_ARRAY || SD_ARRAY.length === 0){
            createNew()
            setActiveById(0)
        }
    }


// createNew = .createNew.bind(SD);

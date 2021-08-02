import { Sd } from '@emotion-icons/material'
import {get, set} from 'idb-keyval'
import moment from 'moment'
import toasty from './toasty'
import intro from './intro'
import {debounce} from 'lodash'




//= Variables /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let IS_AVAIL = false
let INIT_ALERT_NUM = 0

let SD_INITIALIZED = false

let MOMENT_FORMAT = "dddd, MMMM Do, h:mm:ss a"
let date = moment().format(MOMENT_FORMAT)

let SD_ARRAY = [
    {
        active: true, // is the current file active
        name: `Intro File`, // the short name used as the title
        sum: 'A simple intro to this application', // a short summary used in the load document selection window
        date: `${date}`, // the date of creation
        edit: `${date}`, // the date of the last edit
        content: intro, // the content of the document
        position: {
            line: 0, // the vertical line position of the cursor
            column: 0 // the horizontal position of the cursor
        }
    }
]

let NUM_FILES = SD_ARRAY.length

//! boolean type___________________________________________
// name: '',        // name on menu
// type: '',        // type for display and toggle
// state: false,    // state for display and functionality
// group: '',       // group for grouping or filtering or details
// desc: '',        // description to explain setting
// default: true,   // default to revert to defaults

//! array type ___________________________________________
// name: '',
// type: 'array',
// state: 2,
// options: [{          // an array of objects containing the options and details
//    name: ''          // a full name to show in the description or dropdown
//    shortName: '',    // a short name to display in the active option slot
//    desc: ''          // an extended description with details
// }, {}, {}...]
// group: '',
// desc: '',
// default: 1

//! number type ___________________________________________
// name: '',
// type: 'number',
// state: 27,
// group: '',
// desc: '',
// default: 12,
// min: 0,              // a min value
// max: 100             // a max value

//! string type ___________________________________________
// name: '',
// type: 'string',
// state: 'watermelon',
// group: '',
// desc: '',
// default: 'peach',
// min: 0,              // a min string length
// max: 42              // a max string length


let SETTINGS_ARRAY = [
    {
        name: 'A boolean setting',// name on menu
        type: 'boolean', // type for display and toggle
        state: true, // state for display and functionality
        group: 'editorSettings', // group for grouping or filtering or details
        desc: 'This setting controls things about stuff', // description to explain setting
        default: true, // default to revert to defaults
    },
    {
        name: 'Another boolean setting',
        type: 'boolean',
        state: false,
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
    },
    {
        name: 'An array setting',
        type: 'array',
        state: 2,
        options: ['option One here', 'option 2 here', 'option three here', 'Option number is over 9000! what will we do?'],
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
    },
    {
        name: 'A number setting',
        type: 'number',
        state: 17,
        min: 0,
        max: 100,
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
    },
    {
        name: 'A string setting',
        type: 'string',
        state: `Yup, that's a string`,
        min: 0,
        max: 30,
        group: 'editorSettings',
        desc: 'This setting controls things about stuff',
    }

]




//= Private Functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const CHECK_AVAIL = () => { 
    return new Promise((resolve, reject) => {
        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            reject()
        }else{
            set('IDBKV_TEST', 'test_value')
                .then(()=>{
                    resolve()
                })
                .catch((err)=>{
                    ALERT_STATUS()
                    return reject()
                })
        }
    })
  
}

//~ ___________________________________________________________________________________________________________________________________
/** Every few seconds - save the new data to localStorage */
const SAVE_TO_DISK = debounce(() => {
    if(typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined'){         
        set('MD_EDITOR_SD', SD_ARRAY)
            .then()
            .catch(err=> ALERT_STATUS())

        set('MD_EDITOR_SETTINGS', SETTINGS_ARRAY)
            .then()
            .catch(err=> ALERT_STATUS())
    }
 
},
1000,
{ leading: true, trailing: true, maxWait: 5000 }
);




    
//~ ___________________________________________________________________________________________________________________________________
/** Initialize the SD object and load data from memory, or create new object and save to memory if it does not exist */
const INITIALIZE = () => {


    console.log('SAVE | INIT ---------')
    get('MD_EDITOR_SD')
        .then(x=>{
            if(x && x.length !== 0){
                // console.log('SAVE | INIT| got data from LSD')
                SD_ARRAY = x
            }else{
                // console.log('SAVE | INIT | no data in LSD ')
            }
            SD_INITIALIZED = true
        })
        .catch(err=>{
            // console.log(`SAVE | INIT | data not available...${err}`)
            SD_INITIALIZED = true
            ALERT_STATUS()

        })

    get('MD_EDITOR_SETTINGS')
        .then(x=>{
            if(x && x.length !== 0){
                // console.log('SAVE | INIT| got settings from LSD')
                SETTINGS_ARRAY = x
            }else{
                // console.log('SAVE | INIT | no settings in LSD ')
            }
            SD_INITIALIZED = true
        })
        .catch(err=>{
            // console.log(`SAVE | INIT | settings not available...${err}`)
            SD_INITIALIZED = true
            ALERT_STATUS()

        })
                    
}

const WAIT_FOR_INIT = () => {
    return new Promise((resolve, reject) => {
        const waitLoop = () => {
            if(!SD_INITIALIZED){
                setTimeout(() => {
                    waitLoop()
                }, 200);
            }else{
                resolve()
            }
        }
        waitLoop()
    })
    
}

//~ ___________________________________________________________________________________________________________________________________
const ALERT_STATUS = () => {
    INIT_ALERT_NUM++

    if(INIT_ALERT_NUM === 1 || INIT_ALERT_NUM > 100){
        INIT_ALERT_NUM = 2
        toasty({
            type: 'error',
            text: 'Save data not available! Are you incognito!? View the docs for more info',
            time: 10000,
            agree: {
                text: 'View Docs',
                func: () => location.replace('/docs')
            },
            dismiss: {
                text: 'Report Issue',
                func: () => location.replace('https://github.com/pratiqdev/md-editor/issues')
            },
            closeAnyway: true,
        })
    }
}





    








//= Public Functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//~ ___________________________________________________________________________________________________________________________________
/** Initialize the SD object and load data from memory, or create new object and save to memory if it does not exist */
export const init = () => {
    // call the initialize function
    INITIALIZE()

    // alert the user if 
    CHECK_AVAIL()
        .then(()=>{
            IS_AVAIL = true
        })
        .catch(()=>{
            
            IS_AVAIL = false 
            
            // only alert the user occasionaly about failed storage
            ALERT_STATUS()
        })
}

//! CHECK DATA /////////////////////////////////////////////////////////////////////////////////
export const getNumberOfDocuments = () => {
        return SD_ARRAY.length || 0  
}

//~ ___________________________________________________________________________________________________________________________________
/** Create a new document with the default object */
export const createNew = () => {

    let date = moment().format("dddd, MMMM Do, h:mm:ss a")
    NUM_FILES++
    let num = NUM_FILES

    SD_ARRAY.push({
        active: false, // is the current file active
        name: `New File ${num}`, // the short name used as the title
        sum: 'A new file', // a short summary used in the load document selection window
        date: `${date}`, // the date of creation
        edit: `${date}`, // the date of the last edit
        content: `New File ${num}
Created ${date}`, // the content of the document
        position: {
            line: 99999,
            column: 999999
        }
    })
    SAVE_TO_DISK()
    
}








//! GET /////////////////////////////////////////////////////////////////////////////////

/** Get the entire SD_ARRAY  */
export const getAll = () => {
    return SD_ARRAY
}

//~ ___________________________________________________________________________________________________________________________________
/** Get a single element of the SD_ARARY by id  */
export const getById = (id) => {

    if(SD_ARRAY && SD_ARRAY.length !== 0){
        return getAll()[id]
    }else{
        createNew()
        setActiveById(0)
        return SD_ARRAY[0]
    }
}

//~ ___________________________________________________________________________________________________________________________________
/** Return the SD object that is currently active  */
export const getActive = () => {
    return new Promise((resolve, reject) => {
        if(!SD_ARRAY || SD_ARRAY.length === 0){
            createNew()
            setActiveById(0)
        }
        let x = SD_ARRAY.find(x => x.active)
        resolve(x)
    })
}




//! UPDATE /////////////////////////////////////////////////////////////////////////////////

/** Set the selected SD object to active by index */
export const setActiveById = (givenId) => {


    SD_ARRAY.forEach((x, i) => {
        if(givenId === i){
            x.active = true
        }else{
            x.active = false
        }
    })
    SAVE_TO_DISK()
}

//~ ___________________________________________________________________________________________________________________________________
/** Save the content to the current active SD object  */
export const updateContent = (val, line, column) => {
    // console.log('WHO IS CALLING UPDATE CONTENT???')
    getActive().then(x=>{
        x.content = val
        if(line){
            x.position.line = line 
        }
        if(column){
            x.position.column = column 
        }
        // console.log(`SAVE | saving position ${line || 'no line'} @ ${column || 'no column'}`)
    })
    SAVE_TO_DISK()
}

//~ ___________________________________________________________________________________________________________________________________
/** Save the summary to the current active SD object  */
export const updateSummary = (val) => {
    getActive().sum = val
    SAVE_TO_DISK()
}

//~ ___________________________________________________________________________________________________________________________________
/** Save the name to the current active SD object  */
export const updateName = (val) => {
    getActive().name = val
    SAVE_TO_DISK()
}


export const updateNameByIndex = (val, i) => {
    SD_ARRAY[i].name = val
    SAVE_TO_DISK()
}


export const updateSummaryByIndex = (val, i) => {
    SD_ARRAY[i].sum = val
    SAVE_TO_DISK()
}






//! DELETE  /////////////////////////////////////////////////////////////////////////////////

/** Delete the setlected SD object by id   */
export const deleteById = (givenId) => {
    if(SD_ARRAY.length === 0){
        createNew()
        setActiveById(0)
    }else{

        // if this sd is active, set another one to active
        if(SD_ARRAY[givenId].active){
            if(givenId === 0){
                setActiveById(1)
            }else{
                setActiveById(0)
            }
        }


        SD_ARRAY.splice(givenId, 1);
    }
    SAVE_TO_DISK()
}












//! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//= SETTINGS
//! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const getAllSettings = () => {
    return new Promise((resolve, reject) => {
        console.log('SETTINGS | getAllSettings() ')
        WAIT_FOR_INIT()
        .then(()=>{
            resolve(SETTINGS_ARRAY)
        })
        .catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}

export const getSettingByIndex = (i) => {
    return SETTINGS_ARRAY[i]
}

/**
 * Toggle or set a setting to true or false, cycle through options, or set to specified option by index.
 * 
 * @param index - target a setting to modify 
 * 
 * @param newState - the state to be selected  
 * 
 * ---
 * 
 * bool: toggle or set to `newState` if provided  
 * array: cycle to next option or set to `newState` if provided  
 * string: set string to the value of `newState`
 * number: set number to the value of `newState`
 */
export const toggleSetting= (index, newState) => {
    let s = SETTINGS_ARRAY[index]

    switch(s.type){
        //* handle array type settings
        case 'arr':
        case 'array':
            {
                // if no new state was provided - cycle to next or first element
                if(typeof newState === 'null' || typeof newState === 'undefined'){
                    // if there is room to increment++, or set to 0
                    s.state < s.options.length ? s.state++ : s.state = 0
                    console.log(`SETTING | set '${s.name}' to ${s.state}`)
                    return true
                }else{
                    if(typeof newState === 'number'){
                        // check if within range
                        if(newState >= 0 && newState <= s.options.length){
                            s.state = newState
                            console.log(`SETTING | set '${s.name}' to ${s.state}`)
                            return true
                        }else{
                            console.log(`SETTING | '${s.name}' : newState must be between 0 and ${s.options.length}`)
                            return false
                        }
                    }else{
                        console.log(`SETTING | '${s.name}' : newState must be of type number`)
                        return false
                    }
                }
            }; break;

        //* handle number type settings
        case 'num':
        case 'number':
            {
                // handle setting the new state directly to given number
                if(typeof newState === 'number'){
                    let outOfRange = 0
                    // check if max exists && not greater than max
                    if(s.max && newState > s.max){
                        outOfRange++
                        console.log(`SETTING | '${s.name}' : must be <= ${s.max}`)
                    }
                    // check if min exists && not less than min
                    if(s.min && newState < s.min){
                        outOfRange++
                        console.log(`SETTING | '${s.name}' : must be >= ${s.min}`)
                    }
                    if(outOfRange === 0){
                        s.state = newState
                    }
                    
                }else{
                    console.log(`SETTING | '${s.name}' : newState must be number. got ${newState}`)
                }
            }; break;

        //* handle string type settings
        case 'str':
        case 'string':
            {
                if(typeof newState === 'string'){
                    s.state = newState
                    console.log(`SETTING | set '${s.name}' to ${s.state}`)
                }else{
                    console.log(`SETTING | '${s.name}' : newState must be of type string`)
                }
            }; break;

        //* handle boolean type settings
        default:
            {
                switch(newState){
                    case 'true':
                    case true: { s.state = true };break;
                    case 'false':
                    case false: { s.state = false };break;
                    default: {s.state = !s.state}
                }
                console.log(`SETTING | set '${s.name}' to ${s.state}`)

            }
    }
    // SETTINGS_ARRAY[index].state = val
    SAVE_TO_DISK()
}
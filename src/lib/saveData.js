import { Sd } from '@emotion-icons/material'
import {get, set} from 'idb-keyval'
import moment from 'moment'
import toasty from './toasty'
import {debounce, replace, cloneDeep} from 'lodash'
import * as ALERT from './alert'
import { version } from '../../package.json'
import intro from './intro'
import SETTINGS_ARRAY_IMPORT from './SETTINGS_ARRAY'



//= Variables //////////////////////////////////////////////////////////////////////////////////////////////////

let SETTINGS_ARRAY = SETTINGS_ARRAY_IMPORT

export let IS_AVAIL = false
let INIT_ALERT_NUM = 0

let SD_INITIALIZED = false
let V_TEST_FINISHED = false

let MOMENT_FORMAT = "ddd, MMM D, h:mm:ss a"
let getNow = () => moment().format(MOMENT_FORMAT)

let SD_ARRAY = [
    {
        active: true, // is the current file active
        name: `Intro File`, // the short name used as the title
        sum: 'A simple intro to this application', // a short summary used in the load document selection window
        date: `${getNow()}`, // the date of creation
        edit: `${getNow()}`, // the date of the last edit
        content: intro, // the content of the document
        position: {
            line: 0, // the vertical line position of the cursor
            column: 0 // the horizontal position of the cursor
        }
    }
]

let TEMPLATE_ARRAY = [
    {
        name: `Basic Template`, // the short name used as the title
        sum: 'A template for something', // a short summary used in the load document selection window
        date: `${getNow()}`, // the date of creation
        edit: `${getNow()}`, // the date of the last edit
        content: 
`---
I am a template!
---

# Template
`, // the content of the document
        
    }
]

let NUM_FILES = SD_ARRAY.length






//= Private Functions //////////////////////////////////////////////////////////////////////////////////////////

const CHECK_AVAIL = () => { 
    return new Promise((resolve, reject) => {
        if(typeof window === 'undefined' || !window.indexedDB || typeof window.indexedDB === 'undefined'){ 
            reject()
        }else{
            set('IDBKV_TEST', 'test_value')
                .then(()=>{
                    resolve()
                    console.log(`SD | CHECK_AVAIL | SD is available!`)
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

//~ ________________________________________________________________________________________________________________
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




    
//~ _________________________________________________________________________________________________________________
/** Initialize the SD object and load data from memory, or create new object and save to memory if it does not exist */
const INITIALIZE = () => {


    // console.log('SAVE | INIT ---------')
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
            console.log(`SAVE | INITIALIZE | settings not available...${err}`)
            SD_INITIALIZED = true
            // ALERT_STATUS()

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

//~ ________________________________________________________________________________________________________________
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





    








//= Public Functions ///////////////////////////////////////////////////////////////////////////////////////////




//~ ________________________________________________________________________________________________________________
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
            // ALERT_STATUS()
        })
}

//! CHECK DATA /////////////////////////////////////////////////////////////////////////////////
export const getNumberOfDocuments = () => {
        return SD_ARRAY.length || 0  
}

//~ ________________________________________________________________________________________________________________
/** Create a new document with the default object */
export const createNew = () => {

    NUM_FILES++
    let num = NUM_FILES

    let newContent = ''
    let usePrepend = SETTINGS_ARRAY.find(x=> x.id === 'auto-prepend-content')?.state[0]
    let useAppend = SETTINGS_ARRAY.find(x=> x.id === 'auto-append-content')?.state[0]
    let prependString = SETTINGS_ARRAY.find(x=> x.id === 'auto-prepend-content')?.state[1]
    let appendString = SETTINGS_ARRAY.find(x=> x.id === 'auto-append-content')?.state[1]

    console.log(`SD | usePrepend: ${usePrepend} - useAppend: ${useAppend}`)

    if(usePrepend){
        newContent = prependString + '\r\n \r\n' + newContent
    }
    if(useAppend){
        newContent = newContent + '\r\n \r\n' + appendString
    }

    SD_ARRAY.push({
        active: false, // is the current file active
        name: `New File ${num}`, // the short name used as the title
        sum: 'A new file', // a short summary used in the load document selection window
        date: `${getNow()}`, // the date of creation
        edit: `${getNow()}`, // the date of the last edit
        content: newContent, // the content of the document
        position: {
            line: 99999,
            column: 999999
        }
    })
    SAVE_TO_DISK()
    
}


export const createNewAndActivate = debounce(() => {
    return new Promise((resolve, reject) => {
        
        
        
        createNew()
        let newIndex = getAll().length - 1
        console.log(`NEW FILE | INDEX: ${newIndex}`)
        setActiveById(newIndex)
        resolve()
    })
  },
  3000,
  { leading: false, trailing: true }
  );







//! GET /////////////////////////////////////////////////////////////////////////////////

/** Get the entire SD_ARRAY  */
export const getAll = () => {
    return SD_ARRAY
}

//~ ________________________________________________________________________________________________________________
/** Get a single element of the SD_ARARY by id  */
export const getById = (id) => {
    return new Promise((resolve, reject) => {
        
        if(SD_ARRAY && SD_ARRAY.length !== 0){
            resolve(SD_ARRAY[id])
        }else{
            createNew()
            setActiveById(0)
            resolve(SD_ARRAY[0])

        }
    })
}

//~ ____________________________________________________________________________________________________________
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

//~ ________________________________________________________________________________________________________________
/** Save the content to the current active SD object  */
export const updateContent = (val, line, column) => {
    // console.log('WHO IS CALLING UPDATE CONTENT???')
    getActive().then(x=>{
        x.content = val
        x.edit = getNow()
        if(line){
            x.position.line = line 
        }
        if(column){
            x.position.column = column 
        }
        // console.log(`SD | saving position ${line || 'no line'} @ ${column || 'no column'}`)
    })
    SAVE_TO_DISK()
}

//~ ________________________________________________________________________________________________________________
/** Save the summary to the current active SD object  */
export const updateSummary = (val) => {
    getActive().sum = val
    SAVE_TO_DISK()
}

//~ ________________________________________________________________________________________________________________
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


export const addNewConditionToReplacers = () => {
    SETTINGS_ARRAY
    .find(x=> x.id === 'find-and-replace-values').state
    .push({
            active: true,
            name: 'New condition',
            description: 'Optional Description',
            find: '`Find` keyword or RegExp',
            replace: '`Replace` keyword',
    })
    SAVE_TO_DISK()
}

export const removeConditionFromReplacersById = (givenId) => {
    SETTINGS_ARRAY
    .find(x=> x.id === 'find-and-replace-values').state
    .splice(givenId, 1);
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






//! SAVE FILE TO MACHINE  /////////////////////////////////////////////////////////////////////////////////


/** Use the find - replace fields from settings before saving the file  */
const REPLACE_CONTENT = givenX => {
    return new Promise((resolve, reject) => {
        let x = cloneDeep(givenX)
        let replacerObjects = SETTINGS_ARRAY.find(x=> x.id === 'find-and-replace-values')?.state

        if(replacerObjects[0]){ // check if the globalActive state is true

            replacerObjects
            .filter(x=> x.active) // only use replacers that are active
            .forEach(r => {
                let useReplacer
                    if(r.replace === '{{date}}'){ useReplacer = x.date }
                        else if(r.replace === '{{edit}}'){ useReplacer = x.edit }
                        else if(r.replace === '{{filename}}'){ useReplacer = x.name }
                        else if(r.replace === '{{word-count}}'){ useReplacer = x.content.trim().split(/\s+/).length }
                        else if(r.replace === '{{line-count}}'){ useReplacer = x.content.split(/\r|\n|\r\n/).length }
                        else if(r.replace === '{{character-count}}'){ useReplacer = x.content.replace(/ /g, "").replace(/\r\n/g, "").length }
                        else{ useReplacer = r.replace }

                if(r.find instanceof RegExp){
                    x.content = x.content.replace(r.find, useReplacer)
                }else{
                    let reg = new RegExp(`${r.find}`,'mg')
                    x.content = x.content.replace(reg, useReplacer)
                }
            })
        }

        resolve(x)
    })
}


/** Save the current file to the users machine */
export const saveActiveFile = () => {
    getActive().then(x=>{
        REPLACE_CONTENT(x)
            .then(x=>{

                let filename = `${x.name}.md`
                var pom = document.createElement('a');
                pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(x.content));
                pom.setAttribute('download', filename);
                
                if (document.createEvent) {
                    var event = document.createEvent('MouseEvents');
                    event.initEvent('click', true, true);
                    pom.dispatchEvent(event);
                }
                else {
                    pom.click();
                }
                ALERT.fileSaved()
            })
        })
}


/** Save the current file to the users machine */
export const saveFileById = (givenId) => {
    getById(givenId).then(xById=>{
        let x = xById
        console.log(`SD | saveFileById: ${givenId} - ${x.name}`)
        
        let filename = `${x.name}.md`
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(x.content));
        pom.setAttribute('download', filename);
        
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
        ALERT.fileSaved()
    })
        
}












//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//= SETTINGS
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const getAllSettings = () => {
    return new Promise((resolve, reject) => {
        // console.log('SD | getAllSettings() ')
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

export const getSettingByName = (name) => {
    return SETTINGS_ARRAY.find(x=> x.id === name)
}


export const resetAllSettingsToDefault = () => {
    return new Promise((resolve, reject) => {
        // console.log('SD | reset all settings to defaults')
        SETTINGS_ARRAY.forEach(x=>{
            x.state = x.default

        })
        resolve()
    })
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
                    // console.log(`SETTING 1 | set '${s.name}' to ${s.state}`)
                    return true
                }else{
                    if(typeof newState === 'number'){
                        // check if within range
                        if(newState >= 0 && newState <= s.options.length){
                            s.state = newState
                            // console.log(`SETTING 2 | set '${s.name}' to ${s.state}`)
                            return true
                        }else{
                            // console.log(`SETTING 3 | '${s.name}' : newState must be between 0 and ${s.options.length}`)
                            return false
                        }
                    }else{
                        // console.log(`SETTING 4 | '${s.name}' : newState must be of type number`)
                        return false
                    }
                }
            }; break;

        //* handle number type settings
        case 'num':
        case 'number':
            {
                // handle setting the new state directly to given number
                if(newState === ''){ALERT.blank(s.name)}
                if(typeof newState === 'number'){
                    let outOfRange = 0
                    // check if max exists && not greater than max
                    if(s.max && newState > s.max){
                        outOfRange++
                        ALERT.minMax(s.min, s.max, s.name)
                    }
                    // check if min exists && not less than min
                    if(s.min && newState < s.min){
                        outOfRange++
                        ALERT.minMax(s.min, s.max, s.name)
                    }
                    if(outOfRange === 0){
                        s.state = newState
                    }
                    
                }else{
                    ALERT.nan(newState)
                    // console.log(`SETTING 7 | '${s.name}' : newState must be number. got ${newState}`)
                }
            }; break;

        //* handle string type settings
        case 'str':
        case 'string':
            {
                if(typeof newState === 'string'){
                    s.state = newState
                    // console.log(`SETTING 8 | set '${s.name}' to ${s.state}`)
                }else{
                    // console.log(`SETTING 9 | '${s.name}' : newState must be of type string`)
                }
            }; break;
        //* handle string type settings
        case 'bool-string':
        case 'find-and-replace':
        case 'snippets':
            {
                s.state = newState
                // console.log(`SETTING 11 | set '${s.name}' to ${s.state}`)
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
                // console.log(`SETTING  0 | set '${s.name}' to ${s.state}`)

            }
    }
    // SETTINGS_ARRAY[index].state = val
    SAVE_TO_DISK()
}


//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//= SNIPPETS
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllSnippets = () => {
    return new Promise((resolve, reject) => {
        // console.log('SD | getAllSnippets() ')
        WAIT_FOR_INIT()
        .then(()=>{
            let res = SETTINGS_ARRAY.find(x=>x.id==='custom-snippets').state
            resolve(res)
        })
        .catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}


export const addNewSnippet = () => {
    SETTINGS_ARRAY
    .find(x=> x.id === 'custom-snippets').state
    .push({
            active: true,
            title: 'New snippet',
            description: 'Optional Description',
            name: '`name` of snippet',
            code: '`code` of snippet',
    })
    SAVE_TO_DISK()
}

export const removeSnippetById = (givenId) => {
    SETTINGS_ARRAY
    .find(x=> x.id === 'custom-snippets').state
    .splice(givenId, 1);
    SAVE_TO_DISK()
}




//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////
//= TEMPLATES
//! ////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllTemplates = () => {
    return new Promise((resolve, reject) => {
        // console.log('SD | getAllSnippets() ')
        WAIT_FOR_INIT()
        .then(()=>{
            resolve(TEMPLATE_ARRAY)
        })
        .catch(err=>{
            console.log(err)
            reject(err)
        })
    })
}

//~ ________________________________________________________________________________________________________________
/** Get a single element of the SD_ARARY by id  */
export const getTemplateById = (id) => {
    return new Promise((resolve, reject) => {
        
        if(TEMPLATE_ARRAY && TEMPLATE_ARRAY.length !== 0){
            resolve(TEMPLATE_ARRAY[id])
        }else{
            addNewTemplate()
            resolve(TEMPLATE_ARRAY[0])
        }
    })
}


export const addNewTemplate= () => {
    TEMPLATE_ARRAY
    .push(    {
        name: `New Template`, 
        sum: 'Another template for something', 
        date: `${getNow()}`,
        edit: `${getNow()}`, 
        content: 
`---
I am a new template!
---

# New Template
`, 
        
    })
    SAVE_TO_DISK()
}

export const deleteTemplateById = (givenId) => {
    TEMPLATE_ARRAY
    .splice(givenId, 1);
    SAVE_TO_DISK()
}


export const updateTemplateNameByIndex = (val, i) => {
    TEMPLATE_ARRAY[i].name = val
    SAVE_TO_DISK()
}


export const updateTemplateSummaryByIndex = (val, i) => {
    TEMPLATE_ARRAY[i].sum = val
    SAVE_TO_DISK()
}
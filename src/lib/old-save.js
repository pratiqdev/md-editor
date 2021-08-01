import {get, set} from 'idb-keyval'
import moment from 'moment'





let SD_ARRAY = []









/**
 * Every few seconds - save the new data to localStorage
 */
const saveToDisk = () => {
    if(typeof window !== 'undefined' && window.indexedDB){


    set('MD_EDITOR_SD', SD_ARRAY)
        .then(()=>console.log('saved to disk!'))
        .catch(err=>console.log(`no local storage: ${err}`))
 
}}


//! GET ALL _______________________________________________________________________________________________

/**
 * Get the entire SD_ARRAY 
 * 
 */
 export const getAll = () => {
    if(typeof window !== 'undefined' && window.indexedDB){

    return SD_ARRAY
}}

export const getById = (id) => {
    if(typeof window !== 'undefined' && window.indexedDB){

    if(SD_ARRAY && SD_ARRAY.length !== 0){
        return getAll()[id]
    }else{
        createNew()
        setActiveById(0)
        return SD_ARRAY[0]
    }
}}



//! GET BY ID _______________________________________________________________________________________________


/**
 * Return the SD object that is currently active
 */
export const getActive = () => {
    if(typeof window !== 'undefined' && window.indexedDB){

    if(SD_ARRAY && SD_ARRAY.length !== 0){
        return SD_ARRAY.find(x => x.active)
    }else{
        createNew()
        setActiveById(0)
        return SD_ARRAY[0]
    }
}}

/**
 * Set the selected SD object to active by index
 */
export const setActiveById = givenId => {
    if(typeof window !== 'undefined' && window.indexedDB){

    SD_ARRAY.forEach((x, i) => {
        if(givenId === i){
            x.active = true
        }else{
            x.active = false
        }
    })
    saveToDisk()
}}








//! UPDATE ACTIVE _______________________________________________________________________________________________

/**
 * Save the content to the current active SD object
 */
 export const updateContent = val => {
    if(typeof window !== 'undefined' && window.indexedDB){
        getActive().content = val
    saveToDisk()
}}

/**
 * Save the content to the current active SD object
 */
 export const updateSummary = val => {
    if(typeof window !== 'undefined' && window.indexedDB){
     
    getActive().sum = val
    saveToDisk()
}}

/**
 * Save the content to the current active SD object
 */
 export const updateName = val => {
    if(typeof window !== 'undefined' && window.indexedDB){

    getActive().name = val
    saveToDisk()
    }
}


//! DELETE BY ID _______________________________________________________________________________________________

/**
 * Delete the setlected SD object by id
 */
 export const deleteById = givenId => {
    console.log(getById(givenId))
    SD_ARRAY.splice(givenId, 1);
    if(!SD_ARRAY || SD_ARRAY.length === 0){
        createNew()
        setActiveById(0)
    }
}

const getNumberOfDocuments = () => {
if(typeof window !== 'undefined' && window.indexedDB){

    return SD_ARRAY.length || 0
}    
}

//! CREATE NEW _______________________________________________________________________________________________

/**
 * Create a new document with the default object
 */
 export const createNew = () => {
if(typeof window !== 'undefined' && window.indexedDB){

     let date = moment().format("dddd, MMMM Do, h:mm:ss a")
     let num = getNumberOfDocuments() + 1

    SD_ARRAY.push({
        active: false, // is the current file active
        name: `New File ${num}`, // the short name used as the title
        sum: 'A new file', // a short summary used in the load document selection window
        date: `${date}`, // the date of creation
        edit: `${date}`, // the date of the last edit
        content: '# New Document ', // the content of the document
    })
}
}





//! INIT _______________________________________________________________________________________________


export const init = () => {
    if(typeof window !== 'undefined' && window.indexedDB){
    get('MD_EDITOR_SD')
    .then(x=>{
        SD_ARRAY = x
        return true
    })
    .catch(err=>{
        console.log(`data not available...${err}`)
    })
}
}

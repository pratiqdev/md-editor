import {get, set} from 'idb-keyval'


const SD_ARRAY = [
    {
        id: '001',
        name: 'My Save Data',
        date: 'July 29, 2020 : 2:00pm',
        content: 'My saved data from save 001 (My Save Data)',
    },
    {
        id: '002',
        name: 'My Other file',
        date: 'July 29, 2020 : 2:45pm',
        content: 'Data from save 002 (My Other File)',
    },
]

const SD_INDEX = 0

const activeSaveData = SD_ARRAY[SD_INDEX]



/**
 * Save the editor content and settings to an object in localStorage
 */
const saveCurrentData = () => {
    
}


/**
 * Set the SD_INDEX of the save data from the SD_ARRAY
 * 
 * @param int - index selected
 */
const setActiveSaveData = (index) => {
    SD_INDEX = index
}


/**
 * Get the entire SD_ARRAY 
 * 
 */
 const getArrayOfSaveData = () => {
    return SD_ARRAY
}








export { activeSaveData, setActiveSaveData, getArrayOfSaveData  }
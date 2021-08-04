import {debounce} from 'lodash'
import toasty from './toasty'


//! welcome to site alerts ==============================================================================
let WELCOME_LIMIT = 0
export const welcomeAlerts = () => {
    WELCOME_LIMIT++
    if(WELCOME_LIMIT === 0){
    setTimeout(() => {
        toasty({
          text: `Using version ${version}`,
          type: 'special',
          time: 3000,
          agree: {
            text: 'Got it',
          },
          closeAnyway: true
        })


        
        
      }, 1000);

      setTimeout(() => {
        toasty({
          text: `View the documentation for more info or guides on how to use this application`,
          type: 'info',
          time: 6000,
          dismiss: {
            text: 'Nah',
          },
          agree: {
            text: 'View docs',
            func: () => {router.push('/docs')},
          },
          closeAnyway: true
        })


        
        
      }, 4000);

      setTimeout(() => {
        toasty({
          text: `If you discover any problems please submit a new issue on the github repository!`,
          type: 'alert',
          time: 6000,
          dismiss: {
            text: 'Maybe Later',
          },
          agree: {
            text: 'GitHub',
            func: () => {location.replace('https://github.com/pratiqdev/md-editor/issues')},
          },
          closeAnyway: true
        })


        
        
      }, 10000);
    }
}




//! file save alert ==============================================================================
export const fileSaveAlert = () => {
        toasty({
          text: `Saving file!`,
          type: 'success',
          time: 6000,
        })
}



//! data validation alerts ==============================================================================

export const nanAlert = debounce((val) => {
    toasty({
        type: 'error',
        text: `Value must be a number. Received '${val}'`
    })
}, 4000, { leading: true, trailing: false, maxWait: 4000 });


export const minMaxAlert = debounce((min, max) => {
    toasty({
        type: 'error',
        text: `Length must be between ${min} and ${max}`
    })
}, 4000, { leading: true, trailing: false, maxWait: 4000 });
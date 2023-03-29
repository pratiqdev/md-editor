//* react
import {useState} from 'react'



export let libInstallStatus = 'no-status-yet'
export let deferredPrompt = null


export const triggerInstallFlow = () => {

 

        window.addEventListener('beforeinstallprompt', (e) => {
            
            console.log('📥','"beforeinstallprompt" event fired')

            const promptEvent = window.deferredPrompt;
            if (!promptEvent) {
                // The deferred prompt isn't available.
                console.log('📥','The deferred prompt is not available')
            }

            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e
            console.log('📥','"deferredPrompt" set succesfully')
            
            // set the install status for conditional rendering elsewhere
            libInstallStatus = "can-be-installed"
            console.log('📥',`"status updated" = ${libInstallStatus}`)     
        });
    
}

//* listen for the appinstalled event
// make sure the window exists
if(typeof window !== 'undefined'){
    window.addEventListener('appinstalled', (event) => {
        // Clear the deferredPrompt so it can be garbage collected
        libInstallStatus = 'app-already-installed'
        deferredPrompt = null;
        console.log('📥','"appinstalled" event fired')
    });
}

//* func for showing a modal or dialogue to suggest the user should install the app
export const showInstallPromotion = () => {
    if(libInstallStatus === 'can-be-installed'){
        console.log('📥','status: can-be-installed => SHOW PROMOTION.......')
    }
    if(libInstallStatus === 'app-already-installed'){
        console.log('📥','status: app-already-installed => do NOT show promotion.......')
    }
    if(libInstallStatus === 'no-status-yet' || libInstallStatus === 'not-available'){
        console.log('📥','status: no-status-yet / not-available => do NOT show promotion.......')
    }
}

//* func to re-use (show) the deferred prompt
export const showInstallPrompt = async () => {
        console.log('📥','SHOWING INSTALL PROMPT.......')
        deferredPrompt.prompt()
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
}

//* func to check if the app exists on the device and open with that instead of the site
export const openWithApp = () => {
    console.log('📥','open in app')
}


//* func for displaying the status during testing
export const testStatus = () => {
    //! these should be wrapped in a window check so alerts dont appear in build logs
    if(typeof window !== 'undefined'){
        console.log('📥',`TEST STATUS: ${libInstallStatus}`)
        alert(`TEST STATUS: ${libInstallStatus}`)
    }
} 

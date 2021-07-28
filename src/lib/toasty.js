import {useThemeUI, Flex, Box, Card, Button} from 'theme-ui'
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { GithubSquare as Github } from "@emotion-icons/fa-brands/GithubSquare";
import { Info } from '@emotion-icons/evaicons-solid/Info'
import { AlertTriangle } from '@emotion-icons/evaicons-solid/AlertTriangle'
import { CheckCircleFill } from '@emotion-icons/bootstrap/CheckCircleFill'
import { ErrorAlt } from '@emotion-icons/boxicons-solid/ErrorAlt'
import { Close } from '@emotion-icons/evaicons-solid/Close'

import { v4 as uuidv4 } from 'uuid';

import theme from '../theme/Theme'

// call this without a param to remove all toasts
toast.remove()





/**
 * Configurable toasts created from anywhere 
 * 
 * ---
 * @param {string} type
 * What color / icon to use
 * 
 * type | color | icon
 * :---|:---|:---
 * success | green | check mark
 * alert | yellow | alert triangle 
 * error | red | stop sign
 * info | blue | exclamation circle
 * special | blue - purple | none
 * ---
 * @param {string} message 
 * What message should appear
 * ---
 * @param {number} time
 * Time until auto-dismiss (defaults to 4000 ms)
 * ---
 * @param {object} agree 
 * text - What text will appear in the button (defaults to 'Okay')  
 * func - What function will be called upon agree (defaults to null)  
 * ---
 * @param {object} dismiss
 * text - What text will appear in the button (defaults to X Icon)  
 * func - What function will be called upon dismiss (defaults to null)  
 * ---
 * @param {string} position  
 * The selected location of the toast  
 * eg. top-center, bottom-left
 * ---
 * @param {any} givenId  
 * 
 * An ID of the created toast for programmatic dismissal (defaults to uuid.v4())
 */

const toasty = props => {

  // switch to a column for the buttons if there is a lot of text content
  let buttonColumn = props.text?.toString().length > 120 || props.text.__html?.toString().length > 120 ? true : false 


  let closeTime = props.time || 4000

  // determine if there should be a closeTime at all due to important options in agree or dismiss
  if(props.agree || props.dismiss){ 
    closeTime = 100000000000000000000 
    if(props.closeAnyway){
      closeTime = 10000
      if(props.time){
        closeTime = props.time
      }
    }
  }



  //* use a switch to set toast colors and icons
  let bgColor = null
  let btnColor = null
  let icon = null
  let politeness = null
  let role = null



  switch(props.type){
    case 'info':{
      bgColor = theme.colors.primary_a
      icon = <Info size='22'/>
      role = 'status'
      politeness = 'polite'
    } break;

    case 'alert':{
      bgColor = theme.colors.alert
      btnColor = theme.colors.alert_dark
      icon = <AlertTriangle size='20'/>
      role = 'alert'
      politeness = 'assertive'
    } break;

    case 'error':{
      bgColor = theme.colors.error
      icon = <ErrorAlt size='20'/>
      role = 'alert'
      politeness = 'assertive'
    } break;

    case 'success':{
      bgColor = theme.colors.success
      icon = <CheckCircleFill size='18'/>
      role = 'alert'
      politeness = 'assertive'
    } break;

    case 'special':{
      bgColor = `linear-gradient(45deg, ${theme.colors.primary_b}, ${theme.colors.accent_b} 40%, ${theme.colors.accent_b} 80%, ${theme.colors.primary_b} 100%)`,
      icon = null
      role = 'alert'
      politeness = 'assertive'
    } break;


    default: {
      bgColor = theme.colors.grey_13
      btnColor = theme.colors.grey_11
      role = 'log'
      politeness = 'polite'
    }
  }



  //* provide a unique id if none was provided
  const uniqueToast = props.givenId || uuidv4()

  //* destroy the toast 
  const dismissThis = () => {
    toast.dismiss(window[uniqueToast])
  }






  //* create a function with a random id as the name and call toast() //////////////////////////////////////////////////////////////////////////////////////////////////
      window[uniqueToast] = toast(
      <Flex sx={{ border: '0px solid red', p:'1px', width: '100%', maxWidth: '100%', alignItems: 'center'}}>


          <Flex sx={{minWidth: icon ? '1.2rem' : '0', mr: icon ? '.6rem' : '0', justifyContent: 'flex-start', alignItems: 'flex-start'}}>{icon}</Flex>
          <Flex sx={{alignItems: 'center', ml:2, fontSize: 2, border: '0px solid green', flex: 1, }} >
            {typeof props.text === 'object' ? <div dangerouslySetInnerHTML={props.text}/> : props.text }
          </Flex>


        <Flex sx={{flexDirection: buttonColumn ? 'column-reverse' : ['column-reverse', 'row', 'row'], justifyContent: 'space-between', alignContent: 'center', border: '0px solid yellow', flex: 1, p:'1px', maxWidth: 'min-content'}}>
          <Button 
            sx={{m: 0, display: props.dismiss ? 'flex' : 'none', fontSize: 2,  bg: btnColor ? btnColor : 'transparent', minWidth: 'min-content', whiteSpace: 'nowrap', color: theme.colors.grey_0,}} 
            onClick={()=> {dismissThis(); props.dismiss?.func ? props.dismiss.func() : null}} >
            {props.dismiss?.text ? props.dismiss.text : <Close size='22'/>}
          </Button>
          <Button
            sx={{m: 0, ml:2, display: props.agree ? 'flex' : 'none', fontSize: 2, whiteSpace: 'nowrap', height: 'auto', color: theme.colors.grey_0, bg: 'transparent', border: '1px solid white',
            mb: buttonColumn ? 2 : [2, 0, 0]}} 
            onClick={()=> {dismissThis(); props.agree.func ? props.agree.func() : null}} >
            {props.agree?.text || 'Okay'}
          </Button>
        </Flex>


      </Flex>, 
      {
        duration: closeTime,
                      
        position: props.position ? props.position : 'bottom-center',
        // icon: <Info size='26'/>,
        
        style:{
          background: bgColor,
          color: theme.colors.grey_0,
          border: '1px solid',
          borderColor: theme.colors.grey_0,
          width: '80%',
          maxWidth: '600px',
          padding: '4px 0',
          // width: 'auto',
          borderRadius: 2
        },
        iconTheme: {
          primary: theme.colors.grey_0,
        },
        
        // Aria
        ariaProps: {
          role: role,
          'aria-live': politeness,
        },
      })

} 


export default toasty
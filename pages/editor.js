//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'

//* NEXT __________________________________________________________________________________________
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import styled from "@emotion/styled";

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';
import marked from 'marked'

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import SaveModal from '../src/ui/modals/SaveModal'
import toasty from '../src/lib/toasty';






const Editor = (props) => {

    let defaultText = '# MD Editor \r\n Made with \r\n ``` \r\n - React \r\n - Next \r\n - <3 \r\n ``` \r\n > By Michael Jannetta'
    
    const REF_TEXTAREA = useRef(null)

    const [content, setContent] = useState(defaultText)
    const [showSave, setShowSave] = useState(false)
    

    const renderText = text => {
        const __html = marked(text)
        return { __html }
    }

    let saveData = []

    // INPUT ________________________________________________________
    const handleChange = e => {
        e.preventDefault()
        localStorage.setItem('content', e.target.value)
        setContent(e.target.value)
        
    }
    
    // RESET ________________________________________________________
    const handleReset = () => {
        localStorage.setItem('content', defaultText)
        REF_TEXTAREA.current.value = defaultText
        setContent(defaultText)
    }

    
    // SAVE ________________________________________________________
    const showSaveDialogue = () => {
        setShowSave(true)
    }

    const saveContent = () => {
        console.log('saving content!')
    }
    
    const watchText = () => {
        HTMLTextAreaElement.prototype.getCaretPosition = function () { //return the caret position of the textarea
            return this.selectionStart;
        };
        HTMLTextAreaElement.prototype.setCaretPosition = function (position) { //change the caret position of the textarea
            this.selectionStart = position;
            this.selectionEnd = position;
            this.focus();
        };
        HTMLTextAreaElement.prototype.hasSelection = function () { //if the textarea has selection then return true
            if (this.selectionStart == this.selectionEnd) {
                return false;
            } else {
                return true;
            }
        };
        HTMLTextAreaElement.prototype.getSelectedText = function () { //return the selection text
            return this.value.substring(this.selectionStart, this.selectionEnd);
        };
        HTMLTextAreaElement.prototype.setSelection = function (start, end) { //change the selection area of the textarea
            this.selectionStart = start;
            this.selectionEnd = end;
            this.focus();
        };
        
        var textarea = document.getElementsByTagName('textarea')[0]; 
        
        textarea.onkeydown = function(event) {
            
            //support tab on textarea
            if (event.keyCode == 9) { //tab was pressed
                var newCaretPosition;
                newCaretPosition = textarea.getCaretPosition() + "    ".length;
                textarea.value = textarea.value.substring(0, textarea.getCaretPosition()) + "    " + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
                textarea.setCaretPosition(newCaretPosition);
                return false;
            }
            if(event.keyCode == 8){ //backspace
                if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
                    var newCaretPosition;
                    newCaretPosition = textarea.getCaretPosition() - 3;
                    textarea.value = textarea.value.substring(0, textarea.getCaretPosition() - 3) + textarea.value.substring(textarea.getCaretPosition(), textarea.value.length);
                    textarea.setCaretPosition(newCaretPosition);
                }
            }
            if(event.keyCode == 37){ //left arrow
                var newCaretPosition;
                if (textarea.value.substring(textarea.getCaretPosition() - 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
                    newCaretPosition = textarea.getCaretPosition() - 3;
                    textarea.setCaretPosition(newCaretPosition);
                }    
            }
            if(event.keyCode == 39){ //right arrow
                var newCaretPosition;
                if (textarea.value.substring(textarea.getCaretPosition() + 4, textarea.getCaretPosition()) == "    ") { //it's a tab space
                    newCaretPosition = textarea.getCaretPosition() + 3;
                    textarea.setCaretPosition(newCaretPosition);
                }
            } 
        }
    }
    
    useEffect(()=>{
        if(window.localStorage){

            setTimeout(() => {
                let LSContent = localStorage.getItem('content')
                if(LSContent !== '' ){
                    setContent(LSContent)
                    REF_TEXTAREA.current.value = LSContent
                    console.log('set content from local storage')
                }
            }, 500);

        }else{
            setContent(defaultText)
            REF_TEXTAREA.current.value = defaultText
            toasty({
                type: 'alert',
                text: 'No local storage is available to save data! Are you incognito?'
            })
        }
        watchText()
    }, [])

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    


    return (
        <Box sx={{overscrollBehavior: 'contain'}}>
        <Navbar fixed editor handleReset={handleReset} showSave={showSaveDialogue}/>


            <Box
            sx={{
                bg: 'grey_2',
                color: 'grey_13',
                
            }} 
            className='box editor' >
                <textarea resizable='false' className='innerBox' ref={REF_TEXTAREA} onChange={e=>handleChange(e)}/>
            </Box>


            <Box  className='box result scroll'>
                <Box
                sx={{
                    bg: 'grey_0',
                    color: 'grey_15',
                    '& blockquote':{
                        bg: 'grey_2',
                        borderLeft: '4px solid',
                        borderColor: 'primary_c',
                        p:2,
                        pl: 3,
                        color: 'grey_15',
                    },
                    '& pre':{
                        padding: '.6rem',
                        bg: 'grey_2',
                        border: '1px solid',
                        borderColor: 'grey_3',
                        borderRadius: 2,
                        color: 'grey_12'
                    },
                    '& pre *':{
                        bg: 'transparent'
                    },
                    '& ::marker':{
                        color: 'grey_8'
                    }
                }} 
                className='innerBox' 
                dangerouslySetInnerHTML={renderText(content)} />
            </Box>

            {showSave && <SaveModal handleDeny={()=>setShowSave(false)} handleAccept={()=>saveContent()}/>}


        </Box>
    );
};
export default Editor;

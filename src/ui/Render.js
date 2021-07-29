//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'


import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
// hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('markdown', markdown);
import 'highlight.js/styles/github.css';


//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";


//* EXTERNAL ______________________________________________________________________________________

import marked from 'marked'







const Render = (props) => {

   
    
    const REF_RESULTBOX = useRef(null)

    const renderText = text => {
        if (typeof hljs != 'undefined')
            marked.setOptions({
                highlight: function (code, lang) {
                if (lang && hljs.getLanguage(lang))
                    return hljs.highlight(lang, code).value;
                else
                    return code;
                }
            });
        const __html = marked(text)
        return { __html }
    }



    
 


    const highlightResult = () => {
        if (REF_RESULTBOX) {
            const nodes = REF_RESULTBOX.current.querySelectorAll('pre');
            nodes.forEach((node) => {
                hljs.highlightBlock(node);
                // console.log('found pre to highltight', node)
            });
        }
    }


    
    useEffect(()=>{
        highlightResult()
    }, [])

    


    


    return (
        <>



                <Box
                sx={{
                    position: 'absolute',
                    top: '3rem',
                    bottom: '0',
                    left: '50vw',
                    right: '0',
                    p:3,
                    pt:1,

                    bg: 'grey_0',
                    color: 'grey_15',
                    '& > *':{
                        mb:4
                    },
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
                ref={REF_RESULTBOX}
                dangerouslySetInnerHTML={renderText(props.editorContent)} />

            {/* {showSave && <SaveModal handleDeny={()=>setShowSave(false)} handleAccept={()=>saveContent()}/>} */}




        </>
    )
}
export default Render
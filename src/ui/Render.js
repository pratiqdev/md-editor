//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'


import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import markdown from 'highlight.js/lib/languages/markdown';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('markdown', markdown);
import 'highlight.js/styles/github.css';


//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";


//* EXTERNAL ______________________________________________________________________________________

import marked from 'marked'







const Render = (props) => {

   
    
    const REF_RESULTBOX = useRef(null)

    const renderText = text => {
        let t = text || ''
        // if (typeof hljs != 'undefined')
        //     marked.setOptions({
        //         highlight: function (code, lang) {
        //         if (lang && hljs.getLanguage(lang))
        //             return hljs.highlight(lang, code).value;
        //         else
        //             return code;
        //         }
        //     });
        const __html = marked(t)
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
                    position: props.layout.p,
                    top: props.layout.t,
                    bottom: props.layout.b,
                    left: props.layout.l,
                    right: props.layout.r,
                    width: props.layout.w,
                    height: props.layout.h,

                    p:[2,3,4],
                    pt:[2,3,4],

                    bg: 'grey_0',
                    // color: 'grey_15',
                    '& > *':{
                        mb:4,
                    },
                    '& *':{
                        fontSize: [0,1,2]
                    },
                    '& h1':{
                        fontSize: [3,4,5],
                        mt: 0,
                    },
                    '& h2':{
                        fontSize: [2,3,4]
                    },
                    '& h3':{
                        fontSize: [1,2,3]
                    },
                    '& h4, & h5, & h6':{
                        fontSize: [0,1,2]
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
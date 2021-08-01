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

    const [passedContent, setPassedContent] = useState('')

   
    
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
        setPassedContent(props.parentContent || 'props.editorContent returned empty')
    }, [props.parentContent, props.useTrigger])

    


    


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
                    transition: 'background .3s',
                    overflowY: 'auto',
                    

                    p:[4,5,6],
                    pt:4,

                    bg: 'grey_0',
                    // color: 'grey_15',
                    '& > *':{
                        mb:4,
                    },
                    '& *':{
                        fontSize: [1,2,3]
                    },
                    '& h1':{
                        fontSize: [8,9,10],
                        mt: 0,
                    },
                    '& h2':{
                        fontSize: [6,7,8]
                    },
                    '& h3':{
                        fontSize: [4,5,6]
                    },
                    '& h4, & h5, & h6':{
                        fontSize: [2,3,4]
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
                    },
                    '& img':{
                        maxWidth: '100%'
                    },
                    //~ set a max width on images!
                    //~ use a custom id for titles in the append / generate section of docs!! - mdx doesnt append id's
                }} 
                ref={REF_RESULTBOX}
                dangerouslySetInnerHTML={renderText(passedContent)} />





        </>
    )
}
export default Render
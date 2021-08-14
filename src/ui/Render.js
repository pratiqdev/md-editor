//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'


//* HLJS _________________________________________________________________________________________
import hljs from 'highlight.js/lib/core'

import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('xml', xml);

// import 'highlight.js/styles/base16/atelier-dune.css'



//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";


//* EXTERNAL ______________________________________________________________________________________
import { debounce } from 'lodash'
import marked from 'marked'



const Render = (props) => {






    const REF_RESULTBOX = useRef(null)
    const [fakeState, setFakeState] = useState(false)

    const renderText = text => {
        // console.log(text)
        let t = text || ''
        t = t.replace(/^---[\s\S]+?---$/m, '')

        const __html = marked(t)
        return { __html }
    }



    const setNewThemes = () => {
        if (REF_RESULTBOX) {
            const nodes = REF_RESULTBOX.current.querySelectorAll('pre code');
            nodes.forEach((node) => {
                node.classList.add('style1')
            });
        }
    }

    const debounceTheme = debounce(() => {
        setNewThemes()
    }, 1000, {leading: false, trailing: true})
    
    const debounceHljs = debounce(() => {
        hljs.highlightAll()
    }, 1000, {leading: false, trailing: true})

    useEffect(()=>{
        debounceTheme()
        debounceHljs()
    }, [props.parentContent])







    return (
        <>
            {/* <Button sx={{position: 'relative', zIndex: 1000000 }} onClick={()=>switchTheme()}>!!!</Button> */}
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
            dangerouslySetInnerHTML={renderText(props.parentContent)} />
        </>
    )
}

export default Render
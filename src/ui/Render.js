//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'


//* HLJS _________________________________________________________________________________________
import hljs from 'highlight.js/lib/core'

import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('xml', xml);

import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript);

import css from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('css', css);

import python from 'highlight.js/lib/languages/python'
hljs.registerLanguage('python', python);

import sql from 'highlight.js/lib/languages/sql'
hljs.registerLanguage('sql', sql);

import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('json', json);

import bash from 'highlight.js/lib/languages/bash'
hljs.registerLanguage('bash', bash);

import shell from 'highlight.js/lib/languages/shell'
hljs.registerLanguage('shell', shell);

import diff from 'highlight.js/lib/languages/diff'
hljs.registerLanguage('diff', diff);

import markdown from 'highlight.js/lib/languages/markdown'
hljs.registerLanguage('markdown', markdown);

import java from 'highlight.js/lib/languages/java'
hljs.registerLanguage('java', java);

import lua from 'highlight.js/lib/languages/lua'
hljs.registerLanguage('lua', lua);

import makefile from 'highlight.js/lib/languages/makefile'
hljs.registerLanguage('makefile', makefile);

import perl from 'highlight.js/lib/languages/perl'
hljs.registerLanguage('perl', perl);






//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";


//* EXTERNAL ______________________________________________________________________________________
import { debounce } from 'lodash'
import marked from 'marked'



const Render = (props) => {

    const scroller = document.getElementById('halo-1');
    const scrolling = () => {
        if(scroller){

            let height = scroller.clientHeight;
            let scrollHeight = scroller.scrollHeight - height;
            let scrollTop = scroller.scrollTop;
            let percent = scrollTop / scrollHeight
            // console.log( 'SCROLL R | '+percent)
            // scrollSync('render', percent)
        }
      }

      const scrollerTo = p => {
          if(scroller){

              let height = scroller.clientHeight;
              let scrollHeight = scroller.scrollHeight - height;
              let scrollTop = scroller.scrollTop;
              let percent = scrollHeight * p
              scroller.scrollTop = percent
              // console.log(`scrollTop: ${percent}`)
            }
      }
  






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



    useEffect(()=>{
        if(scroller){
            scroller.addEventListener('scroll', scrolling)
            scrollerTo(.5)
        }
        
        return () => {
            if(scroller){
                scroller.removeEventListener('scroll', scrolling)
            }

        }
    })





    useEffect(()=>{
        console.log(`RENDER SCROLL | ${props.scroll}`)
        scrollerTo(props.scroll)
    }, [props.scroll])





    return (
        <div>
            {/* <Button sx={{position: 'relative', zIndex: 1000000 }} onClick={()=>switchTheme()}>!!!</Button> */}
            <Box
            id='halo-1'
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
                    color: 'grey_12',
                    fontSize: [1,2,2],
                },
                '& pre *':{
                    bg: 'transparent'
                },
                '& .hljs, code':{
                    fontSize: [1,2,2],
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
        </div>
    )
}

export default Render
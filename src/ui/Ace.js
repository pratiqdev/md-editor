//* REACT ______________________________________________________________________
import {useEffect, useState, useRef } from 'react'

//* NEXT _______________________________________________________________________

//* THEME ______________________________________________________________________
import {useThemeUI, Box, Flex} from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 
import gsap from'gsap'

import * as SD from '../lib/save-version-4'


import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-textmate";



const Ace = props => {

    const context = useThemeUI();
    const { theme, components, colorMode, setColorMode } = context;

    const breakIndex = useBreakpointIndex();


    
    const REF_ACE = useRef(null)

    const onChange = (val) => {
        props.handleChange(val)
    }



    let editor

    //* define the editor at start
    useEffect(()=>{
        const reactAceComponent = REF_ACE.current;
        editor = reactAceComponent.editor;
    })


    //* change themes and bg on colorMode or theme change
    useEffect(()=>{
        if(colorMode === 'dark'){
            editor.setTheme('ace/theme/monokai')
            gsap.to([editor.container], {background: '#191919', duration: .3})
        }else{
            editor.setTheme('ace/theme/dawn')
            gsap.to([editor.container], {background: '#ccc', duration: .3})
        }
    }, [colorMode, theme])
    



    

    //! load content from parent only when useTrigger fires 
    useEffect(()=>{
        // console.log(`ACE | useTrigger - content reveived: ${props.parentContent ? true : false}`)
        SD.getActive()
            .then(x=>editor.setValue(x.content))
            
            // editor.setValue(props.parentContent || '97asdf876')
    }, [props.useTrigger])



    return(
        <>
        <Box sx={{
            // position: 'relative',
            // height: '10vh',
            position: props.layout.p,
            right: props.layout.r,
            left: props.layout.l,
            top: props.layout.t,
            bottom: props.layout.b,
            width: props.layout.w,
            height: props.layout.h,
        }}
        // onFocus={()=>breakIndex <= 0 && props.setLayout('editor')} // used to hide render window on mobile devices because virtual keyboard takes up so much space.
        // onFocusOut={()=>breakIndex <= 0 && props.setLayout('split')}
        >
            <AceEditor
                ref={REF_ACE}
                mode="java"
                theme="github"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                width={'100%'}
                height={'100%'}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    fontSize: props.fontSize
                  }}
                  style={{zIndex: '2', }}
                />
            </Box>
        </>
    )
}
export default Ace
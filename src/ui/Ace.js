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

let aceFinishedLoading = false


const Ace = props => {

    const context = useThemeUI();
    const { theme, components, colorMode, setColorMode } = context;

    const breakIndex = useBreakpointIndex();


    
    const REF_ACE = useRef(null)

    const onChange = (val) => {
        props.handleChange(val)
    }



    let editor




    useEffect(()=>{
        const reactAceComponent = REF_ACE.current;
        editor = reactAceComponent.editor;
        colorMode === 'dark' ? editor.setTheme('ace/theme/monokai') : editor.setTheme('ace/theme/dawn')

        if(colorMode === 'dark'){
            gsap.to([editor.container], {background: '#191919', duration: .3})
        }else{
            gsap.to([editor.container], {background: '#ccc', duration: .3})
        }

    }, [colorMode, props, theme])
    



    //! load sd content here ONCE - because it triggers handleUpdate and causes rerender on parent and renderer

    // useEffect(()=>{
        
    //     if(!aceFinishedLoading){
    //         aceFinishedLoading = true
    //         editor.setValue(props.parentContent || 'ACE | loading content once')
    //       }
        

    // })
    

    //! load content from parent only when useTrigger fires
    useEffect(()=>{
        console.log(`ACE | useTrigger - content reveived: ${props.parentContent ? true : false}`)
            
            editor.setValue(props.parentContent || 'ACE | no content passed from parent 563724')
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
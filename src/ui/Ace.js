//* REACT ______________________________________________________________________
import {useEffect, useState, useRef } from 'react'

//* NEXT _______________________________________________________________________

//* THEME ______________________________________________________________________
import {useThemeUI, Box, Flex} from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 



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
        // console.log(val)
        props.handleChange(val)
    }



    let editor

    let currentThemeIndex = 0
    let themeArray = [
        'tomorrow_night',
        'chrome',
        'chaos',
        'dawn',
        'dracula',
        'monokai'
    ]

    const cycleThemes = () => {
        if(currentThemeIndex <= themeArray.length - 1){
            currentThemeIndex++
        }else{
            currentThemeIndex = 0
        }
        editor.setTheme(`ace/theme/${themeArray[currentThemeIndex]}`);
    }

    const setAceToDefaultText = () => {
        editor.setValue(props.defaultContent)
        editor.clearSelection()
        editor.selection.moveTo(0,0)
    }

    useEffect(()=>{
        const reactAceComponent = REF_ACE.current;
        editor = reactAceComponent.editor;
        colorMode === 'dark' ? editor.setTheme('ace/theme/monokai') : editor.setTheme('ace/theme/dawn')
        // props.defaultContent && editor.getValue() !== props.defaultContent ? setAceToDefaultText() : null
    }, [colorMode, props, theme])






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
        onFocus={()=>breakIndex <= 0 && props.setLayout('editor')}
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
                  style={{zIndex: '2'}}
                />
            </Box>
        </>
    )
}
export default Ace
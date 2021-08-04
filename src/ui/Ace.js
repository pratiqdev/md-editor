//* REACT ______________________________________________________________________
import {useEffect, useState, useRef } from 'react'

//* NEXT _______________________________________________________________________

//* THEME ______________________________________________________________________
import {useThemeUI, Box, Flex} from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 
import gsap from'gsap'
import SaveModal from './modals/SaveModal'

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-keybinding_menu"
import "ace-builds/src-noconflict/ext-settings_menu"
import "ace-builds/src-noconflict/ext-error_marker"
import "ace-builds/src-noconflict/snippets/markdown"

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

    const [showSaveModal, setShowSaveModal] = useState(false)

    const breakIndex = useBreakpointIndex();


    
    const REF_ACE = useRef(null)

    const handleSave = () => {
        setShowSaveModal(true)
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
    

    const loadContent = () => {
        console.log('EDITOR | loadContent fired')
        if(editor){
            SD.getActive()
            .then(x=>{
                if(x){
                    
                        console.log('ACE |  triggered useEffect')    
                        editor.setValue(x.content)
                        if(x.position.line && x.position.column){
                        console.log(`ACE | loaded with cursor: ${x.position.line} @ ${x.position.column}`)
                        editor.gotoLine(x.position.line, x.position.column)
                    }else{
                        editor.gotoLine(0,0)
                    }
                }else{
                    setTimeout(() => {
                        loadContent()
                    }, 200);
                }
                // editor.focus()
            })
            
        }else{
            setTimeout(() => {
                loadContent()
            }, 200);
        }
    }



    const loadSettings = () => {
        console.log('EDITOR | loadSettings fired')
        if(editor){
            SD.getAllSettings()
            .then(x=>{
                if(x){
                    // set keybinds
                    // require.config({paths: { "ace" : "../lib/ace"}});
                    // require()
                    // require.config({paths: { "ace" : "../../node_modules/lib/ace"}});
                    require(["ace-builds/src-noconflict/ace"], function(ace) {
                        var ed = ace.edit("UNIQUE_ID_OF_DIV")
                        // editor.setTheme("ace/theme/twilight")
                        ed.session.setMode("ace/mode/markdown")
                        
                        // add command to lazy-load keybinding_menu extension
                        ed.commands.addCommand({
                            name: "showKeyboardShortcuts",
                            bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
                            exec: function(ed) {
                                ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
                                    console.log('???')
                                    module.init(editor);
                                    editor.showKeyboardShortcuts()
                                })
                            }
                        })
                        

                        ed.commands.addCommand({
                            name: "testKeybindings",
                            bindKey: {win: "Ctrl-Shift-m", mac: "Command-Alt-h"},
                            exec: function(ed) {
                                    console.log('Keybinding successful')
                            }
                        })


                        // ed.commands.addCommand({
                        //     name: "testKeybindings",
                        //     bindKey: {win: "Ctrl-s", mac: "Command-s"},
                        //     exec: function(ed) {
                        //             console.log('Save file')
                        //             handleSave()
                        //     }
                        // })
                    })


                    document.addEventListener("keydown", function(e) {
                        if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                          e.preventDefault();
                          handleSave()
                        }
                      }, false);

                    
                     
                }else{
                    setTimeout(() => {
                        loadContent()
                    }, 200);
                }
                // editor.focus()
            })
            
        }else{
            setTimeout(() => {
                loadContent()
            }, 200);
        }
    }

    

    //! load content from parent only when useTrigger fires 
    useEffect(()=>{
        // console.log(`ACE | useTrigger - content reveived: ${props.parentContent ? true : false}`)
        setTimeout(() => {
            
            loadContent()
            loadSettings()
        }, 200);
            
            // editor.setValue(props.parentContent || '97asdf876')
    }, [props.useTrigger])



    const onChange = (val) => {
        let line
        let column
        if(editor){
            line = editor.getCursorPosition().row
            column = editor.getCursorPosition().column
        }
        props.handleChange(val, line, column)
    }


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
                    enableSnippets: true,
                    markers: true,
                    fontSize: props.fontSize
                  }}
                  style={{zIndex: '2', }}
                />
            </Box>
            {showSaveModal && <SaveModal handleDeny={()=>setShowSaveModal(false)}/>}
        </>
    )
}
export default Ace
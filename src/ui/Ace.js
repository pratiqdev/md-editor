//* REACT ______________________________________________________________________
import {useEffect, useState, useRef } from 'react'

//* NEXT _______________________________________________________________________

//* THEME ______________________________________________________________________
import {useThemeUI, Box, Flex} from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 
import gsap from'gsap'
// import SaveModal from './modals/SaveModal'
import * as ALERT from '../lib/alert' 

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-markdown";
// import "ace-builds/src-noconflict/snippets/markdown"
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-textmate";

import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/ext-keybinding_menu"
import "ace-builds/src-noconflict/ext-settings_menu"
import "ace-builds/src-noconflict/ext-error_marker"
import "ace-builds/src-noconflict/ext-options"
import "ace-builds/src-noconflict/ext-prompt"
import "ace-builds/src-noconflict/ext-searchbox"


import 'ace-builds/webpack-resolver'

// import ace from 'ace-builds'
// import { Range, EditSession } from 'ace-builds'

import {
    registerSnippets,
    createSnippets,
} from '../lib/ace-snippet-manager'




import * as SD from '../lib/save-version-4'


import AceEditor from "react-ace";
import { Insert } from '@emotion-icons/fluentui-system-filled';




// let Range = require("ace-builds/src-noconflict/range").Range;


let useFontSize =  12

let currentlyCopyingLine = false
let currentlyCopyingText = ''
let currentRow 
let currentCol 

const Ace = props => {

    const context = useThemeUI();
    const { theme, components, colorMode, setColorMode } = context;

    const [showSaveModal, setShowSaveModal] = useState(false)
    const [contentForSave, setContentForSave] = useState('')

    const breakIndex = useBreakpointIndex();


    
    const REF_ACE = useRef(null)

    const handleSave = () => {
        SD.saveActiveFile()
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
                    
                        // console.log('ACE |  triggered useEffect')    
                        editor.setValue(x.content)
                        if(x.position.line && x.position.column){
                        // console.log(`ACE | loaded with cursor: ${x.position.line} @ ${x.position.column}`)
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
        let snippetsArr = []
        SD.getAllSnippets().then(x=> {

            console.log('all snippets returned', x)
            snippetsArr = x
            


        })
        
 
        
        if(editor){
            SD.getAllSettings()
            .then(x=>{
                if(x){

                        x.map((x, i)=>{
                            console.log(`LOAD SETTINGS ${i} | ${x.name} - ${typeof x.state === 'object' ? x.state[0] : x.state}`)
                        })
                    // set keybinds
                    require.config({paths: { "ace" : "../lib/ace"}});
                    // require()
                    // require.config({paths: { "ace" : "../../node_modules/ace-builds/ace"}});
                    require(["ace-builds/src-noconflict/ace"], function(ace) {
                        var ed = ace.edit("UNIQUE_ID_OF_DIV")
                        // editor.setTheme("ace/theme/twilight")
                        ed.session.setMode("ace/mode/markdown")


                        // do this before disabling snippets so manager has access to the files required
                        registerSnippets(
                            x.find(x=>x.id === 'custom-snippets').state[0],
                            ed,
                            ed.session,
                            'markdown',
                            createSnippets(snippetsArr)
                        ).then(()=>{

                            setTimeout(() => {
                                
                                ed.setOptions({
                                    fontSize: 14,
                                    enableBasicAutocompletion: x.find(x=>x.id === 'enable-basic-autocompletion').state,
                                    enableLiveAutocompletion: x.find(x=>x.id === 'enable-live-autocompletion').state,
                                    enableSnippets: x.find(x=>x.id === 'custom-snippets').state[0],
                                    copyWithEmptySelection:x.find(x=>x.id === 'copy-with-empty-selection').state,
                                })
                            }, 250);
                        })

                        // ed.getSession().setAnnotations([
                        //     {
                        //     row: 1,
                        //     column: 0,
                        //     text: "Error Message?? dfj;lk asjdlkfjalskdf ja sdflk;a jskdjf alksdjfklja sl;dfjalk sdjfklasjdf klajs;ld kfjl;asdjf l;ajsdfl;ja lsdjfl asdjf lkasdjfl; kajsdflkjasd;fkj a;lksdjf;lkj a;lskdfj l;akjsdlkf ", // Or the Json reply from the parser 
                        //     type: "error", // also "warning" and "information"
                        //   },
                        //   {
                        //     row: 3,
                        //     column: 0,
                        //     text: "warning Message??", // Or the Json reply from the parser 
                        //     type: "warning" // also "warning" and "information"
                        //   },
                        //   {
                        //     row: 5,
                        //     column: 0,
                        //     text: "information Message??", // Or the Json reply from the parser 
                        //     type: "info" // also "warning" and "information"
                        //   }
                        // ]);


           
                            




            



                        
                        // show current keybindings _________________________________________________________
                        ed.commands.addCommand({
                            name: "showKeyboardShortcuts",
                            bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-k"},
                            exec: function(ed) {
                                ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
                                    console.log('???')
                                    module.init(editor);
                                    editor.showKeyboardShortcuts()
                                })
                            }
                        })
                        
                        // test keybindings _________________________________________________________________

                        ed.commands.addCommand({
                            name: "testKeybindings",
                            bindKey: {win: "Ctrl-Shift-n", mac: "Command-Shift-n"},
                            exec: function(ed) {
                                    props.handleNewFromShortcut()
                            }
                        })

                        
                        // delete the entire current line VSCode style _________________________________________________________________
                        // ed.commands.addCommand({
                        //     name: "deleteSelection",
                        //     bindKey: {win: "Ctrl-x", mac: "Command-x"},
                        //     exec: function(ed) {
                        //         if(ed.getSelectedText().length === 0){  // if no text is selected
                        //             ed.removeLines()                    // remove the entire line
                        //         }else{                                  // else
                        //             ed.remove()                         // remove the selected content
                        //         }
                        //     }
                        // })


                        // copy the entire current line VSCode style _________________________________________________________________
                        // ed.commands.addCommand({
                        //     name: "copySelection",
                        //     bindKey: {win: "Ctrl-c", mac: "Command-c"},
                        //     exec: function(ed) {
                        //         console.log('KYBD COPY')
                        //         if(ed.getSelectedText().length === 0){ 
                        //             // select line
                        //             // ed.selection.selectLine() //! selects the first char from the next line also...
                        //             currentRow = ed.getCursorPosition().row
                        //             currentCol = ed.getCursorPosition().column
                        //             // console.log(ed.selection.getSel().length)
                        //             ed.selection.setRange({start:{row:currentRow, column:0}, end:{row:currentRow, column:999999}})
                        //             // ed.addSelectionMarker(12, 20)

                        //             currentlyCopyingText = ed.getSelectedText() // copy selection
                        //             currentlyCopyingLine = true
                        //             ed.selection.setRange({start:{row:currentRow, column:currentCol}, end:{row:currentRow, column:currentCol}})  
                        //             ed.clearSelection()

                                    
                        //             console.log(`COPY | whole line: ${currentlyCopyingText}`)
                        //         }else{                 
                        //             currentlyCopyingText = ed.getSelectedText() // copy selection
                        //             currentlyCopyingLine = false
                        //             console.log(`COPY | selection only: ${currentlyCopyingText}`)
                        //             currentlyCopyingLine = false

                        //         }
                        //     }
                        // })




                        // paste the entire current line VSCode style _________________________________________________________________
                        // ed.commands.addCommand({
                        //     name: "pasteSelection",
                        //     bindKey: {win: "Ctrl-v", mac: "Command-v"},
                        //     exec: function(ed) {
                        //         console.log('KYBD PASTE')
                        //         // ed.clearSelection() // always clear the selection when pasting?
                        //         if(currentlyCopyingLine){ 
                        //             currentRow = ed.getCursorPosition().row
                        //             currentCol = ed.getCursorPosition().column
                        //             console.log('PASTE | paste line down from line copy')
                        //             let currentRow = ed.getCursorPosition().row                                                 
                        //             ed.selection.setRange({start:{row:currentRow, column:0}, end:{row:currentRow, column:0}})  
                        //             ed.insert(currentlyCopyingText + '\r\n')                  
                        //             ed.selection.setRange({start:{row:currentRow + 1, column:currentCol}, end:{row:currentRow + 1, column:currentCol}})  

                        //             // ed.selection.setRange({start:{row:currentRow + 1, column:999999}, end:{row:currentRow + 1, column:999999}})   

                        //         }else{                 
                        //             console.log('PASTE | paste selection only')
                        //             ed.insert(currentlyCopyingText)


                        //         }
                        //     }
                        // })
                         
                        
                    })


                    document.addEventListener("keydown", function(e) {
                        if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                          e.preventDefault();
                          handleSave()
                        }

                     
                    }, false);

                    document.addEventListener("keydown", function(e) {
                    if (e.key === '+' && (navigator.platform.match("Mac") ? e.metaKey : e.altKey)) {
                        e.preventDefault();
                        e.stopPropagation()
                        useFontSize+=2
                        editor.setFontSize(useFontSize)
                        console.log(`increase font size: ${useFontSize}`)

                    }

                    
                    }, false);

                    document.addEventListener("keydown", function(e) {
                    if (e.key === '-' && (navigator.platform.match("Mac") ? e.metaKey : e.altKey)) {
                        e.preventDefault();
                        e.stopPropagation()
                        useFontSize-=2
                        editor.setFontSize(useFontSize)
                        console.log(`decrease font size: ${useFontSize}`)
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
        console.log(`ACE | useTrigger `)
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
        setContentForSave(val)
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

                  style={{zIndex: '2', }}
                />
            </Box>
            {/* {showSaveModal && <SaveModal handleDeny={()=>setShowSaveModal(false)} contentForSave={contentForSave}/>} */}
        </>
    )
}
export default Ace
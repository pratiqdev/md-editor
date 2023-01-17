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


// import 'ace-builds/webpack-resolver'

// import ace from 'ace-builds'
// import { Range, EditSession } from 'ace-builds'

import {
    registerSnippets,
    createSnippets,
} from '../lib/ace-snippet-manager'




import * as SD from '../lib/saveData'


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
            gsap.to([editor.container], {background: '#ddd', duration: .3})
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

            // console.log('all snippets returned', x)
            snippetsArr = x
            


        })
        
 
        
        if(editor){
            SD.getAllSettings()
            .then(x=>{
                if(x){

                    const parsedSettings = {}

                    x.forEach(setting => {
                        parsedSettings[setting.id.replace(/-/g, '_')] = setting.state
                    })

                        // x.map((x, i)=>{
                        //     console.log(`LOAD SETTINGS ${i} | ${x.id} - ${typeof x.state === 'object' ? x.state[0] : x.state}`)
                        // })
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
                            // x?.find(x=>x.id === 'custom-snippets').state[0],
                            parsedSettings.custom_snippets[0],
                            ed,
                            ed.session,
                            'markdown',
                            createSnippets(snippetsArr)
                        ).then(()=>{

                            setTimeout(() => {

                                const wrapMethod = () => {
                                    // let state = x?.find(x=>x.id === 'wrap-lines').state 
                                    let state = parsedSettings.wrap_lines
                                    let wrap
                                    if(state === 0){ wrap = false }
                                    if(state === 1){ wrap = true }
                                    if(state === 2){ wrap = -1}
                                    return wrap
                                }

                                const foldMarkMethod = () => {
                                    // let state = x?.find(x=>x.id === 'fold-marker').state 
                                    let state = parsedSettings.fold_marker
                                    let mark
                                    if(state === 0){ mark = 'markbegin' }
                                    if(state === 1){ mark = 'markend' }
                                    if(state === 2){ mark = 'markbeginend'}
                                    return mark
                                }
                                 editor.session.setOption('indentedSoftWrap', true);
                                editor.session.setUseWrapMode(true);
                                editor.setOptions({
                                    autoScrollEditorIntoView: true, // prevent auto scrolling
                                    fontSize: parsedSettings.font_size,                                                  //done
                                    enableBasicAutocompletion: parsedSettings.enable_basic_autocompletion, //done
                                    enableLiveAutocompletion: parsedSettings.enable_live_autocompletion,   //done
                                    enableSnippets: parsedSettings.custom_snippets[0],                     //done
                                    copyWithEmptySelection: parsedSettings.copy_with_empty_selection, //x?.find(x=>x.id === 'copy-with-empty-selection')?.state,      //done
                                    showPrintMargin: parsedSettings.show_print_margin, //x?.find(x=>x.id === 'show-print-margin')?.state,                     //done
                                    printMarginColumn: parsedSettings.print_margin_location, //x?.find(x=>x.id === 'print-margin-location')?.state,               //done
                                    wrap: wrapMethod(),                                                                 //done
                                    useSoftTabs: parsedSettings.use_soft_tabs, //x?.find(x=>x.id === 'use-soft-tabs')?.state,                             //done
                                    tabSize: parsedSettings.soft_tabs_length, //x?.find(x=>x.id === 'soft-tab-length')?.state,                               //done
                                    indentedSoftWrap: parsedSettings.indent_wrapped_lines, //x?.find(x=>x.id === 'indent-wrapped-lines')?.state,                 //! not working
                                    showInvisibles: parsedSettings.show_invisibles, //x?.find(x=>x.id === 'show-invisibles')?.state,                        //done
                                    selectionStyle: parsedSettings.select_line ? 'line' : 'text', // x?.find(x=>x.id === 'select-line')?.state ? 'line' : 'text',          //done
                                    dragDelay: parsedSettings.drag_delay, //x?.find(x=>x.id === 'drag-delay')?.state,                                  //done
                                    dragEnabled: parsedSettings.drag_and_drop, //x?.find(x=>x.id === 'drag-and-drop')?.state,                             //done
                                    firstLineNumber: parsedSettings.first_line, //x?.find(x=>x.id === 'first-line')?.state,                            //done
                                    fadeFoldWidgets: parsedSettings.fade_fold, // x?.find(x=>x.id === 'fade-fold')?.state,                             //done
                                    showFoldWidgets: parsedSettings.fold_widgets, //x?.find(x=>x.id === 'fold-widgets')?.state,                          //done
                                    showLineNumbers: parsedSettings.line_numbers, // x?.find(x=>x.id === 'line-numbers')?.state,                          //done
                                    foldStyle: foldMarkMethod(),                                                        //done
                                    showGutter: parsedSettings.show_gutter, //x?.find(x=>x.id === 'show-gutter')?.state,                                //done
                                    // next
                                    // - scroll speed
                                    // - highlight gutter lines
                                    // - set font family (must be monospace options)
                                    // - cursor style
                                    wrapBehavioursEnabled: true, // what is this???
                                    // also what is behaviors enabled????? i think that means autocomplete brackets and parenthesis
                                })

                               
                            }, 250);
                        })


           
                            




            



                        
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

                        



        
                         
                        
                    })


                  


                  

                    
                     
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


    useEffect(()=>{
        console.log(`SCROLL | ${scroll.position}`)
    }, [props.scroll])


    




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
        <div class='transitioned'>
        <Box 
            id='halo-0'
            sx={{
            // position: 'relative',
            // height: '10vh',
            position: props.layout.p,
            right: props.layout.r,
            left: props.layout.l,
            top: props.layout.t,
            bottom: props.layout.b,
            width: props.layout.w,
            height: props.layout.h,
            overflow: 'hidden',
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
        </div>
    )
}
export default Ace
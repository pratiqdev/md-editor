const editorDisplaySettings = [
{
    name: '',
    group: 'editor display',
    content: `These settings control how the editor and its components are displayed`
},


{ name: "Editor Font Size",
group: "editor display",
content: 
`
Set the default font-size within the editor

*Type: number*  
*Default: 12 | Min: 6 | Max: 24*

`},
{ name: 'Editor Font Family',
group:'editor display',
content:
`
(Not functional yet)
Select the font family for the editor, all included fonts are monospace

*Type: options*  
*Default: *

`},
{ name: 'Selection Style',
group:'editor display',
content:
`
Select the method of highlighting when selecting text

- Line: Highlight the entire line
- Text: Only highlight the selected text  

*Type: options*
*Default: Text*  

`},
{ name: 'Highlight Active Line',
group:'editor display',
content:
`
Highlight the currently active line with a secondary color  

*Type: switch*  
*Default: Enabled*  

`},
{ name: 'Highlight Selected Word',
group:'editor display',
content:
`
Highlight all occurences of the selected word  

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Cursor Style',
group:'editor display',
content:
`
Select the style of the cursor within the editor

- Ace: The default cursor
- Slim: A thin variant of the default cursor
- Smooth: The default cursor with a smooth transition when blinking
- Wide: A wide variant of the default cursor  

*Type: options*  
*Default: Ace*

`},
{ name: 'Show Invisible Characters',
group:'editor display',
content:
`
Show markers for invisible characters like spaces and line-breaks

*Type: switch*  
*Default: Disabled*

`},
{ name: 'Show Gutter',
group:'editor display',
content:
`
Display the gutter with line numbers on the left-side of the editor

*Type: switch*  
*Default: Enabled*
`},
{ name: 'Show Line Numbers',
group:'editor display',
content:
`
Display the line numbers in the editors gutter

*Type: switch*  
*Default: Enabled*

`},
{ name: 'First Line Number',
group:'editor display',
content:
`
Set a custom number for the first line number

*Type: number*  
*Default: 1*
`},
{ name: 'Highlight Line Number',
group:'editor display',
content:
`
Highlight the line number for the currently active line

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Fade Fold Widgets',
group:'editor display',
content:
`
###### Fade Fold Widgets (switch)
Only show fold widgets when hovering the editors gutter

*Type: switch*  
*Default: Disabled*
`},
{ name: 'Scroll Past End',
group:'editor display',
content:
`
Allow the editor to scroll past the last line of content

- Full: Scroll full height
- Half: Scroll half height
- Disabled: Do not scroll past last line

*Type: options*  
*Default: Full*
`,
},












];
export default editorDisplaySettings
    




    /*
    
    
    - Style settings should appear at the top of the list
    
    Core ace components (editor, session, renderer, mouseHandler) implement optionProvider interface
    
    setOption(optionName, optionValue)
    setOptions({
        optionName : optionValue
        ...
    })
    getOption(optionName)
    getOptions()
    
    here's a list of all supported options. Where not indicated otherwise option values are boolean.
    
    editor.setOption will also modify options of session/renderer/$mouseHandler associated with it
    editor options
    
    selectionStyle: "line"|"text"
    highlightActiveLine: true|false
    highlightSelectedWord: true|false
    readOnly: true|false
    cursorStyle: "ace"|"slim"|"smooth"|"wide"
    mergeUndoDeltas: false|true|"always"
    behavioursEnabled: boolean //- use the custom behaviors and shortcuts
    wrapBehavioursEnabled: boolean
    // this is needed if editor is inside scrollable page
    autoScrollEditorIntoView: boolean (defaults to false)
    // copy/cut the full line if selection is empty, defaults to false
    copyWithEmptySelection: boolean 
    useSoftTabs: boolean (defaults to false)
    navigateWithinSoftTabs: boolean (defaults to false)
    enableMultiselect: boolean   # on by default
    
    renderer options
    
    hScrollBarAlwaysVisible: boolean
    vScrollBarAlwaysVisible: boolean
    highlightGutterLine: boolean
    animatedScroll: boolean
    showInvisibles: boolean
    showPrintMargin: boolean
    printMarginColumn: number (defaults to 80)
    // shortcut for showPrintMargin and printMarginColumn
    printMargin: false|number 
    fadeFoldWidgets: boolean
    showFoldWidgets: boolean (defaults to true)
    showLineNumbers: boolean (defaults to true)
    showGutter: boolean (defaults to true)
    displayIndentGuides: boolean (defaults to true)
    fontSize: number or css font-size string
    fontFamily: css font-family value
    // resize editor based on the contents of the editor until the number of lines reaches maxLines
    maxLines: number
    minLines: number
    // number of page sizes to scroll after document end (typical values are 0, 0.5, and 1)
    scrollPastEnd: number|boolean
    fixedWidthGutter: boolean (defaults to false)
    theme: path to a theme e.g "ace/theme/textmate"
    
    mouseHandler options
    
    scrollSpeed: number
    dragDelay:  number
    dragEnabled: boolean (defaults to true)
    focusTimout: number
    tooltipFollowsMouse: boolean
    
    session options
    
    firstLineNumber: number defaults to 1
    overwrite: boolean
    newLineMode: "auto" | "unix" | "windows"
    useWorker: boolean
    useSoftTabs: boolean
    tabSize: number
    wrap: boolean|number
    foldStyle: "markbegin"|"markbeginend"|"manual"
    mode: path to a mode e.g "ace/mode/text"
    
    editor options defined by extensions
    
    to use this options the corresponding extension file needs to be loaded in addition to the ace.js
    
    // following options require ext-language_tools.js
    enableBasicAutocompletion: boolean
    enableLiveAutocompletion:   boolean
    enableSnippets: boolean
    // the following option requires ext-emmet.js and the emmet library 
    enableEmmet: boolean
    // the following option requires ext-elastic_tabstops_lite.js
    useElasticTabstops: boolean
    
    
    */
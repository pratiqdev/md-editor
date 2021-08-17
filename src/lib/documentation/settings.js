const settings = [
{
    name: '',
    group: 'editor functions',
    content: `These settings control how the editor functions`
},
{ name: "Cut / Copy Full Line",
group: "editor functions",
content: 
`
Select and modify the entire line if nothing is selected  

*Type: switch*  
*Default: Enabled*
`
},
{ name: "Use Soft Tabs",
group: "editor functions",
content: 
`
Use multiple spaces instead of the tab character  

*Type: switch*  
*Default: Enabled*
`
},
{ name: "Soft Tab Size",
group: "editor functions",
content: 
`
Number of spaces to use for soft tabs  

*Type: number*  
*Default: 4 | Min: 2 | Max: 10*
`},
{ name: 'Multi-cursor Select',
group: 'editor functions',
content: `
Use multiple cursors to edit content

*Type: switch*  
*Default: Enabled*

![alt-text](https://placekitten.com/800/800)

`},
{ name: 'Show Print Margin',
group: 'editor functions',
content: `
Display a vertical line at a provided location for print margins

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Print Margin Location',
group: 'editor functions',
content: `
Define a custom location for the print margin and line wrapping

*Type: number*  
*Default: 80*

`},
{ name: 'Wrap Lines',
group: 'editor functions',
content: `
Select the behavior of line wrapping 

- Disabled: Use horizontal scroll instead of wrapping text
- Enabled: Wrap text at the edge of the editor
- Margin: Wrap at the print margin line 

*Type: options*  
*Default Enabled*

`},
{ name: 'Indent Wrapped Lines',
group: 'editor functions',
content: `
Automatically indent wrapped lines on the next row

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Use Fold Widgets',
group: 'editor functions',
content: `
Allow folding (collapsing) of sections using a gutter widget

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Drag and Drop',
group: 'editor functions',
content: `
Enable drag and drop of selected content within the editor

*Type: switch*  
*Default: Enabled*

`},
{ name: 'Drag and Drop Delay',
group: 'editor functions',
content: `
Set a custom delay (in milliseconds) for activating drag functionality

*Type: number*  
*Default: 150 | Min: 0 | Max: 1000*


`,
},


{
name: "Editor Display Settings",
group: "settings",
content: 
`###### Editor Font Size (number)
Set the default font-size within the editor

*Default: 12 | Min: 6 | Max: 24*


##### Editor Font Family (options)
Select the font family for the editor, all included fonts are monospace

- 

*Default: *


###### Selection Style (options)
Select the method of highlighting when selecting text

- Line: Highlight the entire line
- Text: Only highlight the selected text  

*Default: Text*  


###### Highlight Active Line (switch)
Highlight the currently active line with a secondary color  

*Default: Enabled*  


###### Highlight Selected Word (switch)
Highlight all occurences of the selected word  

*Default: Enabled*


###### Cursor Style (options)
Select the style of the cursor within the editor

- Ace: The default cursor
- Slim: A thin variant of the default cursor
- Smooth: The default cursor with a smooth transition when blinking
- Wide: A wide variant of the default cursor  

*Default: Ace*


###### Show Invisible Characters (switch)
Show markers for invisible characters like spaces and line-breaks

*Default: Disabled*


###### Show Line Gutter (switch)
Display the gitter with line numbers on the left-side of the editor

*Default: Enabled*


###### Show Line Numbers (switch)
Display the line numbers in the editors gutter

*Default: Enabled*


###### First Line Number (number)
Set a custom number for the first line number

*Default: 1*

###### Highlight Line Number (switch)
Highlight the line number for the currently active line

*Default: Enabled*


###### Fade Fold Widgets (switch)
Only show fold widgets when hovering the editors gutter

*Default: Disabled*


###### Scroll Past End (options)
Allow the editor to scroll past the last line of content

- Full: Scroll full height
- Half: Scroll half height
- Disabled: Do not scroll past last line

*Default: Full*

`,
},












];
export default settings
    




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
const editorFunctionSettings = [
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
{ name: 'Find and Replace on Save',
group: 'editor functions',
content: `
Define custom values that will be automatically replaced with the defined string when saving the file to your machine.

*Type: switch + strings / regexp*  
*Default: 150 | Min: 0 | Max: 1000*


`,
},
{ name: 'Live Replacement',
group: 'editor functions',
content: `
Enable automatic replacement of values in the rendered result during editing. This uses the same set of values when saving, as defined with the setting 'Find and Replace Values'

*Type: switch*  
*Default: True*


`,
},
{ name: 'Custom Snippets',
group: 'editor functions',
content: `
Define a list of custom snippets to be inserted into the document on user selection.
These snippets will be shown in a scrollable menu that appears when typing any matching text, corresponding to a snippets 'name'.
Snippets can be a string of any values, but can be constructed like the example below for easy modification.  
Consider the following examples of a markdown image:  
${'`'}![ ]( )${'`'}  
${'`'}![ \${1} ]( \${2} )${'`'}  
${'`'}![ \${1:alt-text} ]( \${2:url} )${'`'}  
The numbers are used to navigate to (with the tab key) and highlight the text field.  
The text ('alt-text' and 'url') are names of the fields and will be shown when the snippet is inserted into the document.  
Numbers are required for tab navigation but, names can be omitted

*Type: switch*  
*Default: True*


`,
},










];
export default editorFunctionSettings
    




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
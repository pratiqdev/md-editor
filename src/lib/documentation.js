const documentation = [
  //* EDITOR =========================================================================================================================================================================

{
name: "", // editor description
group: "editor",
content: `

This text-editor uses the Ace editor with awesome built-in features.  

- Live syntax highlighing
- Multiple cursors
- Code folding
- Customizable keybindings
- Copy and paste
- Search and replace


Visit [the Ace website](https://ace.c9.io/) to use it in your project!
`,
},
{
name: "Option 1",
group: "editor",
content: `This is option 1 [link](https://google.com)`,
},
{
name: "Option 2",
group: "editor",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: "Option 3 for Doing the Thing with editor",
group: "editor",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},









//* RENDER =================================================================================================================================================================
{
name: "Option 4",
group: "render",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: "Option 5",
group: "render",
content: `This is option 5 [link](https://google.com)`,
},
{
name: "Option 6",
group: "render",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: "Option 7",
group: "render",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: "Option 8",
group: "editor",
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},











//* SETTINGS =================================================================================================================================================================

{
name: "Editor Function Settings",
group: "settings",
content: 
`###### Cut / Copy Full Line (switch)
Select and modify the entire line if nothing is selected  

*Default: Enabled*


###### Use Soft Tabs (switch)
Use multiple spaces instead of the tab character  

*Default: Enabled*


###### Soft Tab Size (number)
Number of spaces to use for soft tabs  

*Default: 4 | Min: 2 | Max: 10*


###### Multi-cursor Select (switch)
Use multiple cursors to edit content

*Default: Enabled*


###### Show Print Margin (switch)
Display a vertical line at a provided location for print margins

*Default: Enabled*


###### Print Margin Location (number)
Define a custom location for the print margin and line wrapping

*Default: 80*


###### Wrap Lines (options)
Select the behavior of line wrapping 

- Disabled: Use horizontal scroll instead of wrapping text
- Enabled: Wrap text at the edge of the editor
- Margin: Wrap at the print margin line 

*Default Enabled*


###### Indent Wrapped Lines (switch)
Automatically indent wrapped lines on the next row

*Default: Enabled*


###### Use Fold Widgets (switch)
Allow folding (collapsing) of sections using a gutter widget

*Default: Enabled*


###### Drag and Drop (switch)
Enable drag and drop of selected content within the editor

*Default: Enabled*


###### Drag and Drop Delay (number)
Set a custom delay (in milliseconds) for activating drag functionality

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













//~ ISSUES ======================================================================================================================================================================

{
  name: "",
  group: "issues",
  content: `This application may not function as expected on mobile devices. This was built mainly for pc users, and may not respond as it was intended. 
  
  If you would like to report a problem, please visit the [repo](https://github.com.pratiqdev/mdd) and submit a new issue.`,
},

{
  name: "Unable to toggle view modes",
  group: "issues",
  content: `The view mode does not always change on a single click of the ${'`toggle view`'} button. Users may have to hold to activate the 'split-window' mode, then click again to switch from the editor to the render, or from the render to the editor.

  <small>Tested on Xiaomi Redmi Note 7</small>
  `,
},


{
  name: "Editor context menu unresponsive",
  group: "issues",
  content: `Some mobile users may experience the context menu is not responding to functions listed in the menu. This may be caused by the chosen function not being implemented (yet) or being disabled in the settings. This menu cannot be altered and will always represent the menu options included with Ace editor. Some devices may also not be capable of performing the selected action.`,
},






















  {
    name: "",
    group: "",
    content: ``,
  },
];
export default documentation

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
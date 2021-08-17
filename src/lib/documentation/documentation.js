import files from './files'
import editorFunctionSettings from './editorFunctionSettings'
import editorDisplaySettings from './editorDisplaySettings'
import changelog from './changelog'
import issues from './issues'


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

















...files,

...editorFunctionSettings,
...editorDisplaySettings,
...changelog,
...issues,

];

export default documentation
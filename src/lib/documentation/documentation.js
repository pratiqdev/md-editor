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
















...editorFunctionSettings,
...editorDisplaySettings,
...changelog,
...issues,

];

export default documentation
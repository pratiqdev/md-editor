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

![alt](https://placekitten.com/800/200)
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









//* RENDER ======================================================================================================================================================================

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
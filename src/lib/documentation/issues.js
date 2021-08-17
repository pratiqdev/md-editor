const issues = [
{
name: "",
group: "issues",
content:
`This application may not function as expected, especially on mobile devices. This application was built mainly for desktop users, and may not respond or function as it was intended. 

If you would like to report a problem, please visit the [repo](https://github.com.pratiqdev/mdd) and submit a new issue.`,
},

{
name: "Unable to toggle view modes",
group: "issues",
content: 
`The view mode does not always change on a single click of the ${'`toggle view`'} button. Users may have to hold to activate the 'split-window' mode, then click again to switch from the editor to the render, or from the render to the editor.

<small>Tested on Xiaomi Redmi Note 7</small>
`,
},


{
name: "Editor context menu unresponsive",
group: "issues",
content: 
`Some mobile users may experience the context menu is not responding to functions listed in the menu. This may be caused by the chosen function not being implemented (yet) or being disabled in the settings. This menu cannot be altered and will always represent the menu options included with Ace editor. Some devices may also not be capable of performing the selected action.`,
},
      
      
      
]
export default issues
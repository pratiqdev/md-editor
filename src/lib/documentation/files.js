const files = [
{name: '',
group: 'Files',
content: `Files are saved in browser memory automatically after any modification.`
},

{name: 'Adding New Files',
group: 'Files',
content: `
New files can be created by navigating to the file selection window and clicking the 'New' button. 
New files are created with prepended and appended content according to the current settings. 
The new file will appear in the list of files, where the file name and details can be modified.
Clicking 'Load' will load the file into the editor and close the file selection window.
`
},
{name: 'File Details',
group: 'Files',
content: `
View details of a file by navigating to the file selection screen and clicking the arrow next to the file name to expand the details section.
The details section includes:

- Description: a short description of the file or contents, defined by the user
- Date: the date and time at which the file was created
- Edit: the date and time at which the file was last modified
- Character count: the total number of characters within the file, including front matter and comments and excluding white space
- Word count: the total number of words within the file, including front matter and comments
- Line count: the total number of lines within the file, including front matter, comments, and any occurrence of system newline characters (\r|\n|\r\n)
`
},
{name: 'Change File Name',
group: 'Files',
content: `
Files names can be changed by navigating to the file selection screen, expanding the details section and clicking on the file name.
`
},
{name: 'Change File Details',
group: 'Files',
content: `
Files details can be changed by navigating to the file selection screen, expanding the details section and clicking on the file name.
`
},
{name: 'Loading Files',
group: 'Files',
content: `
Files can be loaded by opening the file selection window, locating the file and clicking the 'Load' button. This action will close the file selection screen.
`
},
{name: 'Saving Files',
group: 'Files',
content: `
Files can be saved to your machine by navigating to the file selection menu, finding the file you want to save and clicking the 'Save' button. 
This action will open a secondary window with details about the selected file where you can choose to save the file directly or save as a template for later use.
`
},
{name: 'Deleting Files',
group: 'Files',
content: `
Files can be deleted by navigating to the file selection window, locating the file to be deleted and expanding the details section and clicking the 'Delete' button. 
Confirmation is required to delete a file.
`
},


]
export default files
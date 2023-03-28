const intro = 
`---
title: {{filename}}
created: {{date}}
edited: {{edit}}
author: {{author}}
---


![link-text](https://picsum.photos/1000/200?random=41)





## Common Keyboard Shortcuts

| FUNCTION | KEYS |
|:--|:--|
| command palette           | \`CTRL + .\` 
| local palette             | \`CTRL + SPACE\`
| save file dialog          | \`CTRL + S\`
| goto line                 | \`CTRL + L\`
| multi-cursor edit         | \`CTRL + CLICK\`
| move line up              | \`ALT + ARROW_UP\`
| show keyboard shortcuts   | \`CTRL + SHIFT + .\`   
<br />




## Useful Features

**Templates**
allow quick creation of commonly formatted documents with custom templates

**Snippets**
provide custom formatted, insertable code snippets with tab-indexed inputs for 
quick reuse.

**Auto Replace**
values with handlebars syntax to easily update frequently repeated text like 
version-numbers or URL's. 

**Auto Complete**
suggestions with the built-in local palette provides a quick solution 
to repetitive content

**Hidden Front Matter**
in the rendered result prevents cluttered content and accurate previews

**100% Local**
storage used to store file metadata, file content, editor settings and app 
settings

`
export default intro
const snippets = [
    { name: 'link', code: '[${1:alt-text}](${2:url})' },
    { name: 'img', code: '![${1:link-text}](${2:url})' },
    { name: 'codeblock', code: '```${1:lang} \r\n ${2:code} \r\n```' },
    { name: 'table', code: '|${1:heading-1}|${2:heading-2}|${3:heading-3}|\r\n|:--|:--|:--|\r\n|${4:content-1}|${5:content-2}|${6:content-3}|\r\n' },
    { name: 'badge', code: '![badge](https://img.shields.io/badge/${1:label}-${2:message}-${3:color})' },


]
export default snippets
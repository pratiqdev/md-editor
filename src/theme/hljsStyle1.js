import theme from './Theme'
// import {colorMode} from 'theme-ui'
const hljsStyle1 = (colorMode) => {
  // console.log(`hls1 | colorMode: ${colorMode}`)
  let dark = colorMode === 'dark' ? true : false
  return{
    '.style1':{
        '.language':{
          color: 'red'
        },
        '.hljs': {
          // background: theme.colors.grey_4,
          color: dark ? theme.colors.grey_0 : theme.colors.grey_15,
        },
        '.hljs-doctag, .hljs-meta-keyword, .hljs-name, .hljs-strong': {
          fontWeight: 'bold',
        },
        '.hljs-code, .hljs-emphasis': {
          fontStyle: 'italic',
        },
        '.hljs-section, .hljs-tag': {
          color: dark ? '#42a8f8' : '#2064a5',
        },
        '.hljs-selector-class, .hljs-selector-id, .hljs-template-variable, .hljs-variable': {
          color: dark ? '#ade5fc' : '#4a6197',
        },
        '.hljs-meta-string, .hljs-string': {
          color: dark ? '#f98862' : '#f27c22',
        },
        '.hljs-attr, .hljs-quote, .hljs-selector-attr': {
          color: dark ? '#7bdd74' : '#228824',
          // color: 'purple',
        },
        '.hljs-tag .hljs-attr': {
          color: 'inherit',
        },
        '.hljs-attribute, .hljs-title, .hljs-type': {
          color: dark ? '#f97' : '#b44',
        },
        '.hljs-number, .hljs-symbol': {
          color: dark ? '#fc6767' : '#f82323'
        },
        '.hljs-bullet, .hljs-template-tag':{
          color: dark ? '#b8d8a2' : '#b8d8a2',
        },
        '.hljs-built_in, .hljs-keyword, .hljs-literal, .hljs-selector-tag':{
          color: dark ? '#aaaaff' : '#662266',
        },
        '.hljs-code, .hljs-comment, .hljs-formula': {
            color: '#888',
          // color: 'green'
        },
        '.hljs-link, .hljs-selector-pseudo, .hljs-regexp': {
          color: dark ? '#c6b4f0' : '#008899',
        },
        '.hljs-meta': {
          color:  dark ? '#c6b4f0' : '#4488aa'
        },
        '.hljs-deletion': {
          background: '#fc9b9b',
          color: '#333',
          color: 'yellow'
        },
        '.hljs-addition': {
          background: '#a2fca2',
          color: '#333',
        },
        // /* Purposely ignored */
        // .hljs-operator,
        // .hljs-params,
        // .hljs-property,
        // .hljs-punctuation {}
        '.hljs-subst': {
          color: dark ? '#28f' : '#28f',
          border: '1px solid red', //! --------------------------------------------------------------------
        },
        // /* This applies only if HTML auto-merging plugin is enabled by user (#2889) */
        '.hljs a': {
          color: 'inherit',
        },
        '.hljs a:focus, .hljs a:hover': {
          color: 'inherit',
          textDecoration: 'underline',
        },
        '.hljs mark': {
          background: '#555',
          color: 'inherit',
        },
        
    }
  }
}

export default hljsStyle1;
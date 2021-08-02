const inlineCode = {
  fontFamily: 'Menlo, monospace',
  fontSize: 'inherit',
  backgroundColor: 'grey_4',
  color: 'inherit',
  lineHeight: 1.6,
  px: 1,
  py: 0,
  borderRadius: 1
}


export default {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      margin: 0,
      padding: 0,
      code: {
        ...inlineCode,
      },
    },
    br:{
      my: 7
    },
    h1: {
      variant: "text.heading",
      fontSize: [9,10,10],
      fontFamily: "heading",
      color: "primary_a",
      borderBottom: '2px solid',
      borderColor: 'primary_a',
      mt: 4,
    '&:first-of-type':{
      mt: 1,
    },
    },
    h2: {
      variant: "text.heading",
      fontSize: [5,6,7],
      mt: 6,
      mb: 4,
      fontFamily: "body",
      borderTop: '1px solid',
      borderColor: 'grey_4',
      mt: 4,
    '&:first-of-type':{
      mt: 1,
    },
    },
    h3: {
      variant: "text.heading",
      fontSize: [6,7,7],
      mt: 5,
      // mb: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: [5,6,6],
      mt: 5,
      // mb: 3,
    },
    h5: {
      variant: "text.heading",
      fontSize: [4,5,5],
      mt: 2,
      // mb: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: [3,4,4],
      mt: 1,
      // mb: 1,
    },
    hr: {
      color: "primary_c",
      my: 6,
    },
    p: {
      fontSize: [3,4,4],
      fontFamily: "body",
      lineHeight: [1.75, 1.75, 2],
      color: 'text',
      my: 2,
      code: {
        ...inlineCode,
      },
    },
    strong: {
      fontWeight: "bold",
    },
    pre: {
      fontFamily: "monospace",
      backgroundColor: "grey_1",
      padding: "1em",
      marginTop: "10px",
      lineHeight: "code",
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      fontSize: 6,
      code: {
        color: "inherit",
        lineHeight: "inherit",
        fontFamily: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "1",
      lineHeight: "code",
      padding: ".5em",
      backgroundColor: "grey_3",
    },
    blockquote: {
      bg: "grey_1",
      px: 3,
      py: 1,
      borderLeft: "10px solid",
      borderColor: "primary_c",
      mb: 3,
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    a:{
      color: 'inherit',
      textDecoration: 'underline',
      borderBottom: '2px solid',
      borderColor: 'transparent',
      fontSize: [3,4,4],
      cursor: 'pointer',
      ':hover':{
        // color: 'primary_a'
      textDecoration: 'none',

        borderColor: 'currentColor'
      }
    },
    li:{
      ml: 0,
      pl: 0
    },
    ul:{
      fontWeight: 'body',
      ml: 5,
      ' ul':{
        fontWeight: 'lite'
      },
      ' ul ul':{
        fontWeight: 'lite'
      },
      li:{
        '::marker':{
          color: 'primary_b',
          fontSize: [2,3,4],
        },
      },
      
    },
    ol:{
      fontWeight: 'body',
      ml: 5,
      ' ol':{
        fontWeight: 'lite'
      },
      ' ol ol':{
        fontWeight: 'lite'
      },
      li:{
        '::marker':{
          color: 'primary_b',
          fontSize: [2,3,4],
        },
      },
    },
    // li:{
    //   '::marker':{
    //     color: 'primary_c',
    //     fontSize: [2,3,4],
    //   },
    // },
    
    hr:{
      mt: 7,
      mb: 2,
      color: 'primary_a',
      border: '1px solid'
    },
    i: {
      width: '0px',
      height: '0px',
      fontStyle: 'normal'
    },
    img: {
      width: '100%'
    },
    table:{
      borderCollapse: 'collapse',
      overflowX: 'auto',
    },
    th:{
      px: 3,
      borderBottom: '1px solid',
      borderColor: 'grey_5',
      // borderRight: '1px solid',
      ':last-child':{
        borderRight: '0px solid'
      }
    },
    td:{
      py: 1,
      px: 3,
      borderTop: '1px solid',
      borderColor: 'grey_2',
      mb: 2,
    },
    // this is the 'marked' text created from search matches

    'em':{
      color: 'blue'
    },
    'strong':{
      color: 'green'
    },
    
      'strong':{
        'em':{
          bg: 'rgba(150,150,150,.9) !important',
          // bg: 'red',
          // color: 'white',
          fontStyle: 'normal',
          textDecoration: 'underline',
          p: '.1rem',
          m: '-.1rem',
        }
    }
    



}
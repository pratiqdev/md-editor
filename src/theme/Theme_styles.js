const inlineCode = {
  fontFamily: 'Menlo, monospace',
  fontSize: 'inherit',
  backgroundColor: 'grey_4',
  color: 'inherit',
  lineHeight: 1.6,
  px: 1,
  py: 0,
  p: '.2rem !important',
  borderRadius: 1
}


export default {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      margin: 0,
      padding: 0,
      fontSize: [1,2,2],
      code: {
        ...inlineCode,
      },

    },
    progress: {
      color: 'primary_b',
      bg: 'grey_4'
    },
    br:{
      my: 7
    },
    h1: {
      variant: "text.heading",
      fontSize: [7,8,9],
      fontFamily: "heading",
      color: "primary_a",
      borderBottom: '2px solid',
      borderColor: 'primary_a',
      mt: 8,
    '&:first-of-type':{
      mt: 1,
    },
    },
    h2: {
      variant: "text.heading",
      fontSize: [5,6,7],
      mt: 8,
      pt: 2,
      mb: 0,
      pb:0,
      fontFamily: "body",
      borderTop: '1px solid',
      borderColor: 'grey_6',
      'h2:first-of-type':{
        mt: 0,
        borderTop: '0px solid',
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
      fontSize: [3,4,4],
      mt: 5,
      // mb: 3,
    },
    h5: {
      variant: "text.heading",
      fontSize: [2,3,3],
      mt: 5,
      // mb: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: [1,2,2],
      mt: 5,
      // mb: 1,
    },
    hr: {
      color: "primary_c",
      my: 6,
    },
    p: {
      // fontSize: [1,2,2],
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
      marginTop: "10px",
      lineHeight: "code",
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      fontSize: 'inherit',
      code: {
        color: "inherit",
        lineHeight: "inherit",
        fontFamily: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: 'inherit',
      lineHeight: "code",
      backgroundColor: "yellow",
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
      // fontSize: [3,4,4],
      cursor: 'pointer',
      ':hover':{
        // color: 'primary_a'
      textDecoration: 'none',

        borderColor: 'currentColor'
      }
    },
    li:{
      ml:5,
      lineHeight: '1.2em'
    },
    ul:{
      fontWeight: 'body',
      ml: 0,
      ' ul':{
        fontWeight: 'lite'
      },
      ' ul ul':{
        fontWeight: 'lite'
      },
      li:{
        '::marker':{
          color: 'primary_a',
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
      color: 'grey_10'
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
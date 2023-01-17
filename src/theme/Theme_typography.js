export default {
    fonts: {
        body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
        heading: "Helvetica, sans-serif",
        monospace: "Menlo, monospace",
        special:'Montserrat, sans-serif',
      },
      fontSizes: [10, 12, 14, 16, 18, 20, 22, 24, 30, 34, 38, 42, 46, 50],
      fontWeights: {
        ultraLite: 200,
        lite: 300,
        body: 400,
        heading: 700,
        bold: 700,
      },
      lineHeights: {
        body: 1.5,
        heading: 1.25,
        code: 2,
        expanded: 1.8
      },
      text: {
        default: {
          fontSize: [1,2,2],
          color: 'text',
          lineHeight: 'body',
          fontFamily: 'special',
        },
        caps: {
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        },
        heading: {
          color: 'primary_a',
          letterSpacing: '.07em',
          fontFamily: 'special',
          fontWeight: 'bold',
      },
    },
    links: {
      heading:{
        textDecoration: 'none',
        color: 'primary_b',
        letterSpacing: 1
      }
    }
}
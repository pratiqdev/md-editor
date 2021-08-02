import { Global } from "@emotion/react";
import theme from './Theme'

const Globals = (props) => (
  <Global
    styles={(theme) => ({

      "*": {
        boxSizing: 'border-box',
        scrollPadding: ['10rem','4rem','4rem'],
        transition: 'background .3s, color .3s'
      },
      // text highlight color
      '::selection': {
        background: theme.colors.grey_6,
        color: 'white',
        padding: '10px'
      },




      
    })}
  />
);
export default Globals

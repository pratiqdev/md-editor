import { Global } from "@emotion/react";
import theme from './Theme'

const Globals = (props) => (
  <Global
    styles={(theme) => ({

      "*": {
        boxSizing: 'border-box',
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

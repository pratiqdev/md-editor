import { Global } from "@emotion/react";
import {useThemeUI} from 'theme-ui'


import hljsStyle1 from './hljsStyle1'

const Globals = (props) => {

  const context = useThemeUI();
  const { colorMode } = context;

  const hls1 = hljsStyle1(colorMode)
return  <Global
    styles={(theme) => {
      return ({
        "*": {
          boxSizing: 'border-box',
          scrollPadding: ['10rem', '4rem', '4rem'],
          transition: 'background .3s, color .3s !important'
        },
        // text highlight color
        '::selection': {
          background: theme.colors.grey_6,
          color: 'white',
          padding: '10px'
        },
        'body': {
          maxHeight: '100vh'
        },

        // Ace gutter tooltip _______________________________________________________________
        '.ace_tooltip': {
          background: theme.colors.grey_0,
          color: theme.colors.grey_15,
          border: '1px solid',
          borderColor: theme.colors.grey_15,
          borderRadius: '3px',
          maxWidth: '90vw',
          whiteSpace: 'normal',
        },

        // Keyboard shortcut list ___________________________________________________________
        '#kbshortcutmenu': {
          background: theme.colors.grey_2,
          color: '#fff',
          'h1': {
            color: theme.colors.primary_a,
            width: '100%',
            textAlign: 'center',
            marginBottom: '1rem',
          }
        },
        '.ace_optionsMenuEntry': {
          color: 'transparent',
          display: 'flex',
          borderBottom: '1px solid',
          borderColor: theme.colors.grey_4,
          padding: '4px'
        },
        '.ace_optionsMenuCommand': {
          minWidth: '14rem',
          color: theme.colors.primary_a
        },
        '.ace_optionsMenuKey': {
          color: theme.colors.grey_15,
          fontFamily: 'monospace'
        },


        // Ace search box __________________________________________________________________
        '.ace_search': {
          position: 'absolute',
          paddingTop: '1rem',
          paddingLeft: '1rem',
          border: '1px solid',
          borderTop: '0px solid',
          borderColor: theme.colors.grey_0,
          background: theme.colors.grey_4,
          color: theme.colors.grey_12,
          maxWidth: ['50vw', '60vw','80vw'],
          '*':{
            border: '0px solid'
          }
        },
        '.ace_search_options': {
          color: theme.colors.grey_12,
          padding: '4px',
          paddingRight: '0px',
          width: '40vw',
        },
        '.ace_search_form, .ace_replace_form': {
          display: 'flex',
          justifyContent: 'stretch',
          width: '40vw',
          border: '0px solid',
          background: '#fff',
          borderRadius: '4px',
        },
        '.ace_search_field': {
          width: '100%',
          minWidth: 'auto',
          outline: 'none',
          '&:focus':{
            background: theme.colors.primary_t,
          }
        },

        '.ace_nomatch':{
          border: '0px solid',
          'input':{
            background: '#faa',
            '&:focus':{
              background: '#faa',
            }
          },
        },
        '.ace_searchbtn':{
          background: theme.colors.grey_6,
          borderRight: '0px solid',
          borderLeft: '1px solid',
          borderColor: theme.colors.grey_12,
          color: theme.colors.grey_12,
          '&:hover':{
            background: theme.colors.primary_b,
            color: theme.colors.grey_15,
            borderColor: theme.colors.grey_15,
          },
        },
        '.ace_searchbtn:after':{
          borderColor: `${theme.colors.grey_12} !important`,
          border: '2px solid yellow',
          // borderColor: theme.colors.grey_4,
          '&:hover':{
            borderColor: theme.colors.grey_15,
          },
        },

        '.ace_searchbtn_close':{
          marginTop: '.6rem',
          transform: 'scale(1.5)',
        },


        '.ace_search_form':{
          outline:'none',
          border: '0px solid green'
        },

        '.ace_button': {
          background: 'transparent',
          opacity: 1,
          color: theme.colors.grey_15,
          border: '0px solid',
          borderColor: theme.colors.grey_12,
          padding: '4px',
          borderRadius: '4px',
          '&:hover': {
            background: theme.colors.primary_b,
          }
        },



        '.ace_button[title="Toggle Replace mode"]': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          color: theme.colors.grey_15,
          border: '0px solid',
          borderColor: 'transparent',
          height: '1.5rem',
          width: '1.5rem',
          // fontSize: '2rem',
          '&:hover': {
            background: theme.colors.primary_c
          },
          '&:after': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '1.5rem',
            width: '1.5rem',
            content: 'inherit',
            background: theme.colors.primary_c
          }
        },



        //~HIGHLIGHT THEMES____________________________________________________________________

        
        ...hls1,

        'pre':{
          background: colorMode === 'dark' ? '#222 !important' : '#eee !important',
          overflowX: 'auto',
          overflow: 'hidden',
          padding: '10px !important',
        },
        'code':{
          padding: '10px !important',
        }

       
      });
    }}
  />
};
export default Globals

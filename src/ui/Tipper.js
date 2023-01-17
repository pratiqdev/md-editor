import React, { useEffect } from 'react'
import Tippy, {Arrow} from '@tippyjs/react'
// import 'tippy.js/dist/tippy.css'; // optional
import styled from '@emotion/styled'


const tippyDefaults = `
  font-size: 1em;
  padding: 0;
  margin-top: 0em;
  border-radius: 0.25em;
`

const DefaultWrap = styled(Tippy)`
  ${tippyDefaults}
  background: ${(props) => props.theme.colors.primary_c};
  color: ${(props) => props.theme.colors.text};
  & .tippy-arrow:before {
    color: ${(props) => props.theme.colors.primary_c};
  }
`;

const DarkWrap = styled(Tippy)`
  ${tippyDefaults}
  background: ${(props) => props.theme.colors.grey_2};
  color: ${(props) => props.theme.colors.grey_7};
  & .tippy-arrow:before {
    color: ${(props) => props.theme.colors.grey_2};
  }
`;

const LightWrap = styled(Tippy)`
  ${tippyDefaults}
  background: ${(props) => props.theme.colors.grey_7};
  color: ${(props) => props.theme.colors.grey_2};
  & .tippy-arrow:before {
    color: ${(props) => props.theme.colors.grey_7};
  }
`;

const RedWrap = styled(Tippy)`
  ${tippyDefaults}
  background: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.grey_7};
  & .tippy-arrow:before {
    color: ${(props) => props.theme.colors.red};
  }
`;

const GreenWrap = styled(Tippy)`
  ${tippyDefaults}
  background: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.grey_7};
  & .tippy-arrow:before {
    color: ${(props) => props.theme.colors.green};
  }
`;

const Tipper = props => {
  switch(props.color){
    case 'dark': {return <DarkWrap placement={props.placement ? props.placement : 'bottom'} content={props.tip} delay={props.delay ? props.delay : [1000, 0]}>{props.children}</DarkWrap>}
    case 'light': {return <LightWrap placement={props.placement ? props.placement : 'bottom'} content={props.tip} delay={props.delay ? props.delay : [1000, 0]}>{props.children}</LightWrap>}
    case 'red': {return <RedWrap placement={props.placement ? props.placement : 'bottom'} content={props.tip} delay={props.delay ? props.delay : [1000, 0]}>{props.children}</RedWrap>}
    case 'green': {return <GreenWrap placement={props.placement ? props.placement : 'bottom'} content={props.tip} delay={props.delay ? props.delay : [1000, 0]}>{props.children}</GreenWrap>}
    default: {return <DefaultWrap placement={props.placement ? props.placement : 'bottom'} content={props.tip} delay={props.delay ? props.delay : [1000, 0]}>{props.children}</DefaultWrap>}
  }

}

export default Tipper

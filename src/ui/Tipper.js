import React, { useEffect } from 'react'
import Tippy, {Arrow} from '@tippyjs/react'
// import 'tippy.js/dist/tippy.css'; // optional
import styled from '@emotion/styled'


const tippyDefaults = `
  z-index: 100;
  font-size: 1em;
  padding: 1rem;
  margin-top: 0em;
  border-radius: 0.25em;
  white-space: wrap;
  opacity: 1 !important;
  border: 1px solid #fff2;
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
  background: black !important;
  color: white !important;
  opacity: 1 !important;
  & .tippy-arrow:before {
    color: black !important;
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

let placement = 'bottom center';
let delay = 500

const Tipper = props => {
  return <DarkWrap content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</DarkWrap>
  switch(props.color){
    case 'dark': { return <DarkWrap content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</DarkWrap> }
    case 'light': {return <LightWrap  content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</LightWrap>}
    case 'red': {return <RedWrap  content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</RedWrap>}
    case 'green': {return <GreenWrap  content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</GreenWrap>}
    default: {return <DefaultWrap content={props.tip} delay={props.delay ? props.delay : [delay, 0]}>{props.children}</DefaultWrap>}
  }

}

export default Tipper

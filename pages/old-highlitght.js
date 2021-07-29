import React, { useEffect, useState, useRef } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useThemeUI, Box, Flex, Themed, Button } from "theme-ui";



import nightOwlLight from "prism-react-renderer/themes/nightOwlLight";
import nightOwl from "prism-react-renderer/themes/nightOwl";

const lightCode = nightOwlLight;
const darkCode = nightOwl;


const CodeBlock = ({ children, className }) => {

  

    const context = useThemeUI();
    const { theme, components, colorMode, setColorMode } = context;


    const language = className.replace(/language-/, "");





            <Highlight 
              {...defaultProps} 
              code={children.trim()} 
              language={language}  
              theme={colorMode === 'light' ? lightCode : darkCode}
            >

              {({className, style, tokens, getLineProps, getTokenProps}) => (
                <pre className={className} 
                style={{...style,
                  minHeight: '3rem', padding: '1.1em', fontSize: fontSize, fontFamily: 'Menlo, monospace', lineHeight: '1.5em', overflow: 'auto', whiteSpace: 'nowrap', 
                }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({line, key: i})}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({token, key})} />
                        ))}
                    </div>
                  ))}
                </pre>
              )}

            </Highlight> 

}

export default CodeBlock

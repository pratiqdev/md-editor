import {useEffect, useState, useRef} from 'react'
//* EXTERNAL_____________________________________________________________________________
import MDX from "@mdx-js/runtime"


//* MDX COMPONENTS ______________________________________________________________________
import {Box} from 'theme-ui'


const Render = props => {


    const components = {
        Box: (props) => <Box {...props} />,
        div: (props) => <div {...props} />,
        // pre: (props) => <div {...props} />,
        // code: CodeBlock,
        // blockquote: (props) => <BlockQuote {...props} />,
        // img: (props) => <ImageBox {...props} />,
        
        // Alert,
        // Scrollable,
        // Coder,
        // Link,
        // LinkUI
      } 

      

    return(
        <>  
        RENDER

        <MDX  components={components}>{props.editorContent}</MDX>

        </>
    )
}
export default Render
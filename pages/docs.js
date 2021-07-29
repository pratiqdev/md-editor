import {useState, useEffect, useRef} from 'react'

// THEME ____________________________________________________________________________________
import {
    Flex, 
    Box,
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Slider,
Link as LinkUI} from 'theme-ui'


// LOCAL ____________________________________________________________________________________
import Navbar from '../src/ui/Navbar'

// EXTERNAL ____________________________________________________________________________________
import marked from 'marked'



const dataList = [
{
name: 'Option 1',
group: 'editor',
content: 
`This is option 1 [link](https://google.com)`,
},
{
name: 'Option 2',
group: 'editor',
content: 
`This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: 'Option 3 for Doing the Thing with editor',
group: 'editor',
content: 
`This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
//_______________________
{
name: 'Option 4',
group: 'render',
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,
},
{
name: 'Option 5',
group: 'render',
content: `This is option 5 [link](https://google.com)`,
},
{
name: 'Option 6',
group: 'render',
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,

},
{
name: 'Option 7',
group: 'render',
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,

},
{
name: 'Option 8',
group: 'editor',
content: `This is option 2 

[link](https://google.com)

- list 1
- list 2
- list 3

This is Some text right here boii

`,

},
]


const uniqueGroups = [...new Set(dataList.map(item => item.group))]; 

let docString = ''



//* DOCUMENTATION MENU ITEMS   /////////////////////////////////////////////////////////////////////////
const DocMenuItem = props => {


    return(
        <Flex 
            sx={{
                // borderBottom: '1px solid',
                bottom: '0',
                flexDirection: 'column',
                p:3

            }}>
                
                       <LinkUI sx={{fontWeight: 'bold', mb:3}} href={`#${props.group}`}>
                           {props.group.toUpperCase()}
                        </LinkUI> 

                {dataList
                    .filter(item => item.group === props.group)
                    .map((item, index) => 
                 
                    <LinkUI sx={{fontSize: '.8rem !important', textDecoration: 'none', mb:3}} href={`#${item.name.toString().toLowerCase().replace(/ /g,'-') }`}>
                        {item.name}
                    </LinkUI> 
                )}

        </Flex>
    )
}



//* DOCUMENTATION MENU GROUPS   /////////////////////////////////////////////////////////////////////////
const DocMenu = props => {


    return(
        <Flex 
            sx={{
                // borderRight: '1px solid #888',
                position: ['relative','absolute', 'absolute'],
                left: '0',
                width: ['100vw', '35vw', '25vw'],
                top: ['','10rem','10rem'],
                bottom: '0',
                overflow: 'hidden',
                maxHeight: '93vh',
                flexDirection: 'column',
                p:4,
                bg: 'grey_1',
                mt: [4,0,0]
            }}>
            
                {uniqueGroups.map((group, index) => 
                    <DocMenuItem group={group} />
                )}

        </Flex>
    )
}



const createDocs = () => {
    uniqueGroups.map((group, index) => 
        section(group)
    )
}




const section = val => {
    h1(val),

    dataList
        .filter(item => val === item.group)
        .map((item, index) => {

            h2(item.name)
            append(item.content)
            
        })
}


const append = val => {
    docString += `\r\n ${val} \r\n`
}

const h1 = val => {
    val = val.toUpperCase()
    docString += `\r\n # ${val} \r\n`
}

const h2 = val => {
    docString += `\r\n ## ${val} \r\n`
}

const h3 = val => {
    docString += `\r\n#### ${val} \r\n`
}








//* DOCUMENTATION PAGE   /////////////////////////////////////////////////////////////////////////
const Docs = props => {

    const [searchValue, setSearchValue] =  useState('')
    const [content, setContent] = useState('')



    const renderText = text => {
        const __html = marked(text)
        return { __html }
    }
    

            
    createDocs()

    return(
        <>
            <Navbar />
            <Box sx={{overflowX: 'hidden'}}>
                <Box 
                    sx={{
                        fontSize: '2rem',
                        width: '100%',
                        textAlign: 'center'
                    }}
                    >
                    Documentation
                </Box>

                <Input 
                    sx={{
                        maxWidth: '30rem', 
                        mx: 'auto', 
                        mt:3, 
                        textAlign: 'center'
                    }}
                    onChange={(e)=>setSearchValue(e.target.value)}
                />


                <DocMenu />

                <Box
                sx={{
                    top: '10rem',
                    bottom: '0',
                    right: '0',
                position: ['relative','absolute', 'absolute'],
                left: ['0', '35vw','25vw'],
                width: ['100vw', '65vw', '75vw'],
                top: ['','10rem','10rem'],
                    p:5,
                    pt:1,
                    overflow: 'auto',
                    overflowY: 'auto',
                    maxHeight: ['auto','93vh', '93vh'],
                }}
                    >
                    <Box sx={{

                    bg: 'grey_0',
                    color: 'grey_15',
                    '& > *':{
                        mb:4,
                        fontSize: 2
                    },
                    '& h1':{
                        fontSize: 9,
                        color: '#88f',
                        width: '100%',
                        borderBottom: '2px solid #88f',
                        mt: 8,
                        mb:0,
                    },
                    '& h1:first-child':{
                        mt:0
                    },
                    '& h2':{
                        fontSize: 5,
                        // color: '#88f',
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'grey_3',
                        py: 4,
                        mt:0,
                    },
                    '& blockquote':{
                        bg: 'grey_2',
                        borderLeft: '4px solid',
                        borderColor: 'primary_c',
                        p:2,
                        pl: 3,
                        color: 'grey_15',
                    },
                    '& pre':{
                        padding: '.6rem',
                        bg: 'grey_2',
                        border: '1px solid',
                        borderColor: 'grey_3',
                        borderRadius: 2,
                        color: 'grey_12'
                    },
                    '& pre *':{
                        bg: 'transparent'
                    },
                    '& ::marker':{
                        color: 'grey_8'
                    }
                }} 
                dangerouslySetInnerHTML={renderText(docString)} />
                


                    <Box sx={{p:5, bg: 'grey_4', m: -5, mt:3}}>
                        Made By Michael Jannetta @pratiqdev/mdd
                    </Box>
                    
            </Box>
            </Box>
            
        </>
    )
}
export default Docs
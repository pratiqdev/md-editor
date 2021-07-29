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
    Button,
    Link as LinkUI
} from 'theme-ui'
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media"; 



// LOCAL ____________________________________________________________________________________
import Navbar from '../src/ui/Navbar'
import dataList from '../src/lib/documentation'

// EXTERNAL ____________________________________________________________________________________
import marked from 'marked'
import { truncate } from 'lodash';
import {CaretDown} from '@emotion-icons/boxicons-regular/CaretDown'
import {CaretUp} from '@emotion-icons/boxicons-regular/CaretUp'



const uniqueGroups = [...new Set(dataList.map(item => item.group))]; 

let docString = ''




//* Collapsible MENU ITEM   /////////////////////////////////////////////////////////////////////////
const DocMenuItemCollapse = props => {

    const [isCollapsed, setIsCollapsed] = useState(props.allItemsCollapsed)

    const toggleCollapse = () => {
        props.collapseAll()
        setTimeout(() => {
            setIsCollapsed(!isCollapsed)
        }, 1);
    }

    useEffect(()=>{
        setIsCollapsed(props.allItemsCollapsed)
    }, [props.trigger])


    return(
        <Flex 
            sx={{
                flexDirection: 'column',
                p:1,
                px: 4,

            }}>
            
            {isCollapsed &&
            <Flex sx={{ fontWeight: 'bold',  color: 'primary_a', p:0, justifyContent:'space-between', alignItems: 'center'}}>
                <LinkUI key={props} href={`#${props.group}`} >
                            {props.group.toUpperCase()}
                        </LinkUI>
                <Button variant='icon.primary' sx={{color: 'primary_a'}} onClick={()=>toggleCollapse()}><CaretDown size='22'/></Button>
            </Flex>
            }

            {!isCollapsed &&
                <Flex sx={{flexDirection: 'column'}}>


                    <Flex sx={{fontWeight: 'bold', color: 'primary_a', justifyContent:'space-between'}}>
                        <LinkUI key={props.group} href={`#${props.group}`}>
                            {props.group.toUpperCase()}
                        </LinkUI> 
                        {props.canCollapse &&  <Button variant='icon.primary' sx={{color: 'primary_a'}} onClick={()=>toggleCollapse()}><CaretUp size='22'/></Button>}
                    </Flex>
                    

                    {dataList
                        .filter(item => item.group === props.group)
                        .map((item, index) => 
                    
                        <LinkUI key={item.name} sx={{fontSize: '.8rem !important', textDecoration: 'none', mb:2}} href={`#${item.name.toString().toLowerCase().replace(/ /g,'-') }`}>
                            {item.name}
                        </LinkUI> 
                    )}


                </Flex>
            }





        </Flex>
    )
}




//* DOCUMENTATION MENU GROUPS   /////////////////////////////////////////////////////////////////////////
const DocMenu = props => {

    const breakIndex = useBreakpointIndex();


    const [allItemsCollapsed, setAllItemsCollapsed] = useState(true)
    const [trigger, setTrigger] = useState(false)
    const [canCollapse, setCanCollapse] = useState(true)

    const collapseAll = () => {
        console.log('collapseAll')
        setTrigger(!trigger)
    }

    useEffect(()=>{
        if(breakIndex <= 0){
            setAllItemsCollapsed(true)
            setCanCollapse(true)
            setTrigger(!trigger)

        }else{
            setAllItemsCollapsed(false)
            setCanCollapse(false)
            setTrigger(!trigger)

        }
    }, [breakIndex])

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
                p:2,
                bg: 'grey_2',
                mt: [4,0,0]
            }}>
            
                {uniqueGroups.map((group, index) => 
                    group && <DocMenuItemCollapse group={group} collapseAll={collapseAll} allItemsCollapsed={allItemsCollapsed} trigger={trigger} canCollapse={canCollapse}/>
                )}

        </Flex>
    )
}



const createDocs = (sv) => {
    docString = ''
    uniqueGroups.map((group, index) => 
        section(group, sv)
    )
}



const section = (val, sv) => {

    dataList
        .filter(item => val === item.group )
        .filter(item => {
            if(!sv){
                return true
            }else{
                console.log(sv)
                return sv.map(s => 
                    item.content.toLowerCase().includes(s.toLowerCase())
                    || item.name.toLowerCase().includes(s.toLowerCase()) 
                    || val.toLowerCase().includes(s.toLowerCase())).includes(true)
                }
            }
        )
        .map((item, index) => {
            if(index === 0){
                h1(val)
            }

            item.name && h2(item.name) 
            item.content && append(item.content)
            
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
    

            
    createDocs(searchValue)

    return(
        <Box sx={{bg: 'grey_4', height: '100vh'}}>
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
                        textAlign: 'center',
                        bg: 'grey_1'
                    }}
                    onChange={(e)=>setSearchValue(e.target.value.replace(/ /g, '%%').split('%%').filter(s => 
                        s !== ''
                        && s !== 'the'
                        && s !== 'is'
                        && s !== 'when'
                        && s !== 'or'
                        ))}
                />


                <DocMenu />

                <Box
                sx={{
                    bottom: '0',
                    right: '0',
                top: ['0','10rem', '10rem'],
                    position: ['relative','absolute', 'absolute'],
                left: ['0', '35vw','25vw'],
                width: ['100vw', '65vw', '75vw'],
                maxHeight: ['auto','93vh', '93vh'],
                    p:5,
                    pt:1,
                    overflow: 'auto',
                    overflowY: 'auto',
                    // borderTop: '10px solid',
                    borderColor: 'grey_1',
                    bg: 'grey_0'
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
                        color: 'primary_a',
                        width: '100%',
                        borderBottom: '2px solid',
                        borderColor: 'primary_a',
                        mt: 8,
                        mb:0,
                    },
                    '& h1:first-of-type':{
                        mt:0
                    },
                    '& h2':{
                        fontSize: 5,
                        // color: 'primary_a',
                        width: '100%',
                        borderTop: '1px solid',
                        borderColor: 'grey_3',
                        py: 4,
                        mt:0,
                    },
                    '':{

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
            
        </Box>
    )
}
export default Docs
//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from "react";

//* NEXT __________________________________________________________________________________________
import { useRouter } from "next/router";
import Link from "next/link";

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text, Grid } from "theme-ui";

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";

/** the home page */
const Index = (props) => {
  const router = useRouter();

  let REF_SCROLL_POINT = useRef();

  useEffect(() => {});

  return (
    <Box sx={{paddingTop: ['50vh', '30vh', '0vh'], height: '100vh', width: '100%', overflowY: 'scroll'}}>
    <Flex
      sx={{
        positon: "absolute",
        minHeight: "100vh",
        height: '100%',
        pb: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar fixed />

      <Flex
        sx={{
          flexDirection: "column",
          // alignItems: 'center',
          maxWidth: '90rem',
          p: 6,
          pt:8,
          width: "100%",
          alignItems: 'center'
        }}
      >
        
        
      
        <Box sx={{ whiteSpace: 'nowrap',fontSize: 'calc(2rem + 2vmin)', textAlign: 'center', mb: 4, color: 'primary_b'}}>
          MDE Markdown Editor
        </Box>
              {/* <Box sx={{ fontSize: [3,4,4], mb:4, textAlign: ['center', 'left', 'left']}}>
                An advanced markdown editor with awesome features
              </Box>
              <ul>
                <li>Custom and built-in snippets</li>
                <li>Custom and built-in templates</li>
                <li>Automatic keyword replacement on save</li>
                <li>Tons of keyboard shortcuts</li>
                <li>Advanced command pallette</li>
                <li>VSCode style editor navigation</li>
              </ul> 
               */}
        <Flex sx={{ 
          flex:1,
          flexDirection: 'column',
        }}>
          <Flex sx={{
            p:4, 
            flexDirection: ['row', 'row', 'column'],
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'min-content',
            }}>
              
          
                <Link href='/editor'>
                  <Button variant='accent' sx={{whiteSpace: 'no-wrap', m:4, p: 4, px:8, fontSize: [3,4,4], }}>Get Started!</Button>
                </Link>
              {/* <Box sx={{mx: ['auto', 0, 0], width: ['auto', 'auto', '100%'], flex:0, mt: 4, p:4, }}> */}
              {/* <Box id='welcome-1' sx={{p:4, width: '100%', height: ['40vw','40vw','auto']}} /> */}
          {/* </Box>   */}
          </Flex>  

          <Grid columns={[1,1,3]} sx={{mt: [0,0,2], mb:8, alignItems: 'space-between'}} >


          <Flex sx={{mt: 6, flexDirection: ['column', 'row', 'column'], justifyContent: 'space-between', background: '#88f2', p:4, borderRadius: '.5rem'}}>
          <Box sx={{p:4, textAlign: 'center', maxWidth: '50rem', mx:'auto', fontWeight: 'bold', flex:1}}>
              Use the interactive walkthrough to get familiar with the interface and features of MDE
            </Box>
            <Link href={{pathname: 'editor', query: {walkthrough: true}}}>
            <Button variant='primary' sx={{mt:2, py: 2, width:  'auto', mx: 'auto', fontSize: [3,4,4],}}>Walkthrough</Button>
            </Link> 
          </Flex>

          <Flex sx={{mt: 6, flexDirection: ['column', 'row', 'column'], justifyContent: 'space-between', background: '#88f2', p:4, borderRadius: '.5rem'}}>
          <Box sx={{p:4, textAlign: 'center', maxWidth: '50rem', mx:'auto', fontWeight: 'bold', flex:1}}>
              Browse the docs to find more details about all of the features, settings of MDE
            </Box>
            <Link href='/docs'>
            <Button variant='primary' sx={{mt:2, py: 2, width:'auto', mx: 'auto', fontSize: [3,4,4],}}>Documentation</Button>
            </Link> 
          </Flex>

          <Flex sx={{mt: 6, flexDirection: ['column', 'row', 'column'], justifyContent: 'space-between', background: '#88f2', p:4, borderRadius: '.5rem'}}>
          <Box sx={{p:4, textAlign: 'center', maxWidth: '50rem', mx:'auto', fontWeight: 'bold', flex:1}}>
              Use the interactive walkthrough to get familiar with the interface and features of MDE
            </Box>
            <Link href='/about'>
              <Button variant='primary' sx={{mt:2, py: 2, width: 'auto', mx: 'auto', fontSize: [3,4,4],}}>About this App</Button>
            </Link> 
          </Flex>
    
        </Grid>


          <Box sx={{  mt:8, mb:4, textAlign: ['center']}}>
            <Text sx={{color:'primary_b', fontSize: [3,4,4], fontWeight: 'bold'}}>
                An advanced markdown editor with awesome features
            </Text>
              
              </Box>
              {/* <ul>
                <li>Custom and built-in snippets</li>
                <li>Custom and built-in templates</li>
                <li>Automatic keyword replacement on save</li>
                <li>Tons of keyboard shortcuts</li>
                <li>Advanced command pallette</li>
                <li>VSCode style editor navigation</li>
              </ul> */}
          <Grid columns={[2,2,6]}  >


            <Box sx={{px:2, background: '#88f1', m:2, px: 2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Custom and built-in code snippets
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Automatic keyword replacement on save
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Custom and built-in templates
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              VSCode style shortcuts
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Advanced settings and configuration
            </Box>
  
            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              100% local storage - no database required
            </Box>




            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Automatic snippet cursor movement
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Unlimited file count with local storage
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              VSCode style command palette
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Detailed, categorized and searchable documentation
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              Custom format and style guides
            </Box>

            <Box sx={{px:2, background: '#88f1', m:2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', alignItems: 'center'}}>
              VSCode style editor navigation
            </Box>
      
          </Grid>
        </Flex>



        {/* CTA buttons ---------------------------------------------------------------------------------------- */}














        
      </Flex>

    </Flex>
    </Box>
  );
};


export default Index;
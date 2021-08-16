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
    <Flex
      sx={{
        positon: "absolute",
        minHeight: "100vh",
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
        }}
      ><Box sx={{ whiteSpace: 'nowrap',fontSize: [8,9,10], textAlign: 'center', mb: 4, color: 'primary_b'}}>
                  Welcome to MD Editor! 
              </Box>
        <Flex sx={{ 
          flex:1,
          flexDirection: ['column', 'column', 'row'],
          }}>
          <Flex sx={{
            p:4, 
            flexDirection: 'column',
            alignItems: ['center', 'center','flex-start',],
            minWidth: 'min-content',
            }}>
              
              <Box sx={{ fontSize: [3,4,4], mb:4, textAlign: ['center', 'left', 'left']}}>
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
              <Box sx={{mx: ['auto', 0, 0], width: ['auto', 'auto', '100%'], flex:0, mt: 4, p:4, }}>
          
            <Link href='/editor'>
              <Button variant='accent' sx={{whiteSpace: 'no-wrap', mt:4, py: 2, px:8, width: '100%', fontSize: [3,4,4], }}>Editor</Button>
            </Link> 
            
          </Box>  
          </Flex>  
          <Box id='welcome-1' sx={{p:4, width: '100%', height: ['40vw','40vw','auto']}} />
        </Flex>



        {/* CTA buttons ---------------------------------------------------------------------------------------- */}


        <Grid columns={[1,3,3]} sx={{mt: [0,0,8]}} >


          <Flex sx={{mt: 6, flexDirection: 'column', justifyContent: 'space-between'}}>
          <Box sx={{p:4, textAlign: 'center', maxWidth: '25rem', mx:'auto',}}>
              Use the interactive walkthrough to get familiar with the interface and features of MDE
            </Box>
            <Link href='/walkthrough'>
            <Button variant='outline.primary' sx={{mt:4, py: 2, width:  'auto', mx: 'auto', fontSize: [3,4,4],}}>Walkthrough</Button>
            </Link> 
          </Flex>

          <Flex sx={{mt: 6, flexDirection: 'column', justifyContent: 'space-between'}}>
            <Box sx={{p:4, textAlign: 'center', maxWidth: '25rem', mx:'auto',}}>
              Browse the docs to find more details about all of the features, settings of MDE
            </Box>
            <Link href='/docs'>
            <Button variant='outline.primary' sx={{mt:4, py: 2, width:'auto', mx: 'auto', fontSize: [3,4,4],}}>Documentation</Button>
            </Link> 
          </Flex>

          <Flex sx={{mt: 6, flexDirection: 'column', justifyContent: 'space-between'}}>
            <Box sx={{p:4, textAlign: 'center', maxWidth: '25rem', mx:'auto',}}>
              Use the interactive walkthrough to get familiar with the interface and features of MDE
            </Box>
            <Link href='/about'>
              <Button variant='outline.primary' sx={{mt:4, py: 2, width: 'auto', mx: 'auto', fontSize: [3,4,4],}}>About this App</Button>
            </Link> 
          </Flex>
    
        </Grid>
      </Flex>

    </Flex>
  );
};


export default Index;
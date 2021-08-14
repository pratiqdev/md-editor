//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from "react";

//* NEXT __________________________________________________________________________________________
import { useRouter } from "next/router";
import Link from "next/link";

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text, Grid } from "theme-ui";

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";

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
          width: "100%",
        }}
      >
        <Flex sx={{ 
          flex:1,
          flexDirection: ['column', 'column', 'row'],
          p:'5px',
          }}>
          <Flex sx={{
            p:4, 
            flexDirection: 'column',
            alignItems: ['center', 'center','flex-start',],
            minWidth: 'min-content',
            }}>
              <Box sx={{ whiteSpace: 'nowrap',fontSize: [8,9,10], textAlign: 'left', mb: 4}}>
                  Welcome to MD Editor! 
              </Box>
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
            <Button variant='accent' sx={{whiteSpace: 'no-wrap', mt:4, py: 2, width: '100%', fontSize: [3,4,4], }}>Editor</Button>
          </Link> 
            
          </Box>  
          </Flex>  
          <Box id='welcome-1' sx={{p:4, width: '100%', height: ['40vw','40vw','auto']}} />
        </Flex>



        {/* CTA buttons ---------------------------------------------------------------------------------------- */}


        <Grid columns={[2,4,4]}>

          <Link href='/getting-started'>
            <Button variant='outline.primary' sx={{whiteSpace: 'no-wrap', mt:4, py: 2, width: '100%', fontSize: [3,4,4], }}>Getting Started</Button>
          </Link> 

          <Link href='/walkthrough'>
            <Button variant='outline.primary' sx={{mt:4, py: 2, width: '100%', fontSize: [3,4,4],}}>Walkthrough</Button>
          </Link> 

          <Link href='/docs'>
            <Button variant='outline.primary' sx={{mt:4, py: 2, width: '100%',fontSize: [3,4,4], }}>Documentation</Button>
          </Link> 

          <Link href='/about'>
            <Button variant='outline.primary' sx={{mt:4, py: 2, width: '100%', fontSize: [3,4,4],}}>About this App</Button>
          </Link> 
          
  
          
        </Grid>
      </Flex>

      {/* <Flex sx={{ width: '100%', border: '1px solid yellow',justifyContent: 'space-between', alignItems: 'center'}}>
          <Box>
            <Box sx={{ fontSize: [8,9,10], textAlign: 'left', mb: 8}}>
              Welcome to MD Editor! 
              
            </Box>
            <Box sx={{  fontSize: [3,4,4]}}>
              <Box sx={{ fontSize: [6,7,7], mb:4}}>
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

              <Flex sx={{flexDirection: 'column'}}>
              <Link href='/editor'>
                <Button variant='accent' sx={{mb:6, py: 4, px:8, fontSize: [4,5,7], m:4, mt:6}}>Get Started</Button>
              </Link>
              <Link href='/editor'>
                <Button variant='outline.primary' sx={{mb:6, py: 2, px:8, fontSize: [3,4,4], m:4, mt:2}}>View Guides</Button>
              </Link>
              <Link href='/editor'>
                <Button variant='outline.primary' sx={{mb:6, py: 2, px:8, fontSize: [3,4,4], m:4, mt:2}}>Documentation</Button>
              </Link>
              <Link href='/editor'>
                <Button variant='outline.primary' sx={{mb:6, py: 2, px:8, fontSize: [3,4,4], m:4, mt:2}}>About this App</Button>
              </Link>
              </Flex>

            </Box>
          </Box>
          <Box sx={{width: '50vw', display: ['none', 'none', 'block']}}>
            <img src='screenshots/editor1.png' style={{width: '100%',}} />
          </Box>
        </Flex> */}
    </Flex>
  );
};
export default Index;

//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from "react";

//* NEXT __________________________________________________________________________________________
import { useRouter } from "next/router";
import Link from "next/link";

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text, Grid } from "theme-ui";

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";


/*
Custom and built-in code snippets
              Automatic keyword replacement on save
              Custom and built-in templates
              VSCode style shortcuts
              Advanced settings and configuration
              100% local storage - no database required
              Automatic snippet cursor movement
              Unlimited file count with local storage
              VSCode style command palette
              Detailed, categorized and searchable documentation
              Custom format and style guides
              VSCode style editor navigation
*/

const FEATURE_CARDS = [
  {
    title: 'Command Palette',
    text: 'VSCode style command palette with rich commands'
  },
  {
    title: 'Code Snippets',
    text: 'Built-in, extendable and custom snippets for quick insterions'
  },
  {
    title:'Extensive Shortcuts',
    text:'Long list of familiar shortcuts for frequently used features'
  },
  {
    title: 'Keyword Replace',
    text: 'Automatic keyword replacement of save using the handlebars format'
  },
  {
    title: 'Advanced Settings',
    text: 'Customize appearance and behaviors of the editor and application'
  },
  {
    title: '100% Local',
    text: 'No database required with 100% client-side meta/content store'
  },
  {
    title: 'Searchable Docs',
    text: 'Detailed docs for all features with a simple searchable doc-page'
  },
  {
    title: 'Simple Navigation',
    text: 'In-code keyboard navigation using VSCode style `alt` commands'
  },
  
]



const INTRO_CARDS = [
  {
    title: 'Interactive Guide',
    text: 'Use the interactive walkthrough to get familiar with the interface and features of MDE',
    linkText: 'Guide',
    linkHref: { pathname: 'editor', query: { walkthough: true } },
  },
  {
    title: 'Use The Editor',
    text: 'Jump in and experiment with the editor and its features or documentation',
    linkText: 'Editor',
    linkHref: { pathname: 'editor' },
  },
  {
    title: 'Extensive Documentation',
    text: 'Use the interactive walkthrough to get familiar with the interface and features of MDE',
    linkText: 'Docs',
    linkHref: { pathname: 'docs' },
  }
]

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
              
          
              {/* <Box sx={{mx: ['auto', 0, 0], width: ['auto', 'auto', '100%'], flex:0, mt: 4, p:4, }}> */}
              {/* <Box id='welcome-1' sx={{p:4, width: '100%', height: ['40vw','40vw','auto']}} /> */}
          {/* </Box>   */}
          </Flex>  

          <Grid columns={[1,1,3]} gap={4} sx={{mt: [2,2,4], mb:8, alignItems: 'space-between'}} >


            {INTRO_CARDS.map((item, idx) =>
              <Flex sx={{flexDirection: ['column', 'row', 'column'], justifyContent: 'space-between', background: idx == 1 ? '#66f4' : '#88f2', p:4, borderRadius: '.5rem', fontSize: idx === 1 ? '1.4rem' : '1.2rem', my: idx === 1 ? '-2rem' : '0'}}>
                <Box sx={{p:2, textAlign: 'center', maxWidth: '50rem', mx:'auto', fontWeight: 'bold', flex:1}}>
                  {item.title}
                </Box>
                <Box sx={{textAlign: 'center', fontSize: '90%', height: '100%', flex:1, alignItems: 'center', mx: 3}}>
                  {item.text}
                </Box>
                <Link href={item.linkHref}>
                  <Button variant={idx === 1 ? 'accent' : 'secondary'} sx={{mt:4, py: 2, width:  'auto', mx: 'auto', fontSize: idx === 1 ? [4,5,5] : [2,2,3], minWidth: '6rem'}}>{item.linkText}</Button>
                </Link> 
              </Flex>
            )}




    
        </Grid>


          <Box sx={{  mt:8, mb:4, textAlign: ['center']}}>
            <Text sx={{color:'primary_b', fontSize: [3,4,4], fontWeight: 'bold'}}>
                USEFUL FEATURES
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
          <Grid columns={[2,2,4]}  >

            {FEATURE_CARDS.map((item, idx) => 
              <Box sx={{ px: 2, background: '#88f3', m: 2, borderRadius: '.5rem', textAlign: 'center', justifyContent: 'center', height: '7rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{fontWeight: 'bold'}}>{item.title}</Box>
                <Box sx={{fontSize: '90%', mt: 2}}>{item.text}</Box>
              </Box>
            )}

              
          </Grid>
        </Flex>



        {/* CTA buttons ---------------------------------------------------------------------------------------- */}














        
      </Flex>

    </Flex>
    </Box>
  );
};


export default Index;
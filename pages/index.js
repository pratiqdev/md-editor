//* REACT _________________________________________________________________________________________
import React, { useRef, useEffect, useState } from 'react'

//* NEXT __________________________________________________________________________________________
import { useRouter } from 'next/router'
import Link from 'next/link'

//* THEME _________________________________________________________________________________________
import { Button, Box, Flex, Text } from "theme-ui";
import styled from "@emotion/styled";

//* EXTERNAL ______________________________________________________________________________________
import Tippy from '@tippyjs/react'
import { get, set } from 'idb-keyval';

//* LOCAL _________________________________________________________________________________________
import Navbar from "../src/ui/Navbar";





const Index = (props) => {

  const router = useRouter()

  let REF_SCROLL_POINT = useRef()

  useEffect(()=>{
  })

  return (
      <Flex sx={{
        positon: 'absolute',
        height: '100vh',
        pb: 8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Navbar fixed  />
        

      <Box sx={{px: [4,5,5], fontSize: [6,7,8], maxWidth: '80vw', textAlign: 'center', mb: '6vh'}}>
        View the docs to see what elements can be used here or jump in!
      </Box>



        <Link href='/editor'>
          <Button variant='outline.accent' sx={{minWidth: '25rem', maxWidth: '80vw',mb:6, py: 4, fontSize: [7,8,9]}}>MD Editor</Button>
        </Link>
        <Link href='/docs'>
          <Button variant='outline.secondary' sx={{minWidth: '18rem', mb:4, fontSize: [5,6,7]}}>View Documentation</Button>
        </Link>
        <Link href='/about'>
          <Button variant='outline.secondary' sx={{minWidth: '18rem', mb:4, fontSize: [5,6,7]}}>About this App</Button>
        </Link>

      </Flex>
  );
};
export default Index;

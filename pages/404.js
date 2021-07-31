import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
 
import { useThemeUI, Box, Flex, Text, Button, Link as LinkUI, Card } from 'theme-ui'
import Navbar from '../src/ui/Navbar'



//==================================================================================
const Custom404 = () => {
    const router = useRouter()

    const context = useThemeUI();
    const { theme, components, colorMode, setColorMode } = context;

    let [backdrop, setBackdrop] = useState([]);

      useEffect(() => {
        colorMode === undefined || colorMode === "dark"
          ? setBackdrop(
              `radial-gradient(circle at 90% 10%, #000 2%, #003 22%, #114 42%, #115 60%, #226 82%, ${theme.colors.accent_a} 100% )`
            )
          : setBackdrop(
              `radial-gradient(circle at 8% 33%, ${theme.colors.grey_0} 2%, ${theme.colors.primary_d} 32%, ${theme.colors.primary_c} 62%, ${theme.colors.accent_a} 92% )`
            );

      });

  return (
    <>
      <Box sx={{ overflow: "hidden", height: "100vh" }}>
        <Flex
          sx={{
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            backgroundImage: backdrop,
          }}
        >
          <Navbar logo fixed inline transparent />

            <Text sx={{ fontSize: [8, 8, 10] }}>4 0 4</Text>



          <Flex sx={{flexDirection: ['column', 'row', 'row'],  }}>


          <Flex sx={{ mt: 0, mr: [0, 5, 8], flexDirection: 'column', alignItems: 'center'}}>
            <Text
              sx={{
                m: 2,
                textAlign: 'center',
              }}
            >
              The page you requested does not exist.
            </Text>

              <Button
                sx={{ width: "100%", py: 2, m:0, mt:4, px: 0 }}
                onClick={() => router.back()}
                >
                Go Back
              </Button>

              <Flex sx={{ flexDirection: 'row', justifyContent: "space-between", alignItems: [null, 'center', 'center'], mt: 2, mb: 3, px: 3 }}>
                <Link href="/" passHref>
                  <LinkUI as="a" mr={4}>Return to Home</LinkUI>
                </Link>
                <Link
                  href="https://github.com/pratiqdev/portfolio-issues/issues/new"
                  passHref
                  >
                  <LinkUI as="a" ml={4}>Report an issue</LinkUI>
                </Link>
              </Flex>
            </Flex>





            <Card variant="glass" sx={{ py: 2, px: 4, mt: [4, 0, 0] }}>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                <Text>Possible causes:</Text>
              </Box>
              <Text>
                <ul>
                  <li>It has moved to a new location</li>
                  <li>The url was incorrect or misspelled</li>
                  <li>It was removed by the author</li>
                  <li>It never even existed</li>
                </ul>
              </Text>
            </Card>




            
                
                
                
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
export default Custom404
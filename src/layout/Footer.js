import React from 'react'
import Link from 'next/link'

import { Box, Flex, Text, Link as LinkUI, Grid } from 'theme-ui'
import { version } from '../../package.json';
import { libInstallStatus, showInstallPrompt } from '../lib/install'





const FooterLink = (props) =>
  !props.click ? (
    <Link href={props.href} passHref>
      <Text
        as="a"
        sx={{
          fontSize: [1, 1, 1],
          m: 1,
          color: "grey_15",
          textDecoration: "none",
          ":hover": {
            textDecoration: "underline",
          },
        }}
      >
        {props.text}
      </Text>
    </Link>
  ) : (
    <Text
      onClick={props.click}
      sx={{
        m: 1,
        color: "grey_15",
        fontSize: [1, 1, 1],
        textDecoration: "none",
        cursor: "pointer",
        ":hover": {
          textDecoration: "underline",
        },
      }}
      as="a"
    >
      {props.text}
    </Text>
  );



const Column = (props) => (
  <Flex
    sx={{
      m: 2,
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <Text sx={{ fontSize: [2, 2, 2], color: "grey_10" }}>{props.heading}</Text>
    {props.children}
  </Flex>
);


const linkColumns = [
  {
  heading: 'Markdown',
  links: [
      {
        title: 'About Me',
        href: '/bio',
        active: true
      },
    
    ]
  },
  {
    heading: 'Editor',
    links: [

        {
          title: 'About Site',
          href: '/about',
          active: true
        },

      ]
    },
  
  
  
]



const Footer = () => {
    return (
      <Box
        sx={{
          p: 4,
          position: 'relative',
          textAlign: "center",
          width: "100%",
          bg: "grey_3",
          zIndex: 1,
        }}
      >
        <Flex
          sx={{
            alignItems: "start",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {linkColumns.map((col, index) => 
              <Column key={col.heading + index} heading={col.heading} >
                {col.links.filter(x => x.active).map((link, index) => {
                  return(
                      <React.Fragment key={link.href + index} >
                      {link.href && <FooterLink text={link.title} href={link.href} />}
                      {link.click && <FooterLink text={link.title} click={link.click} />}
                      </React.Fragment>
                    )
                  }
                )}
              </Column>
          )}
        </Flex>

        <Flex sx={{ my: 4, width: "100%", justifyContent: "center", color: 'grey_8'}}>
          <Link href="http://www.github.com/pratiqdev">
            <LinkUI sx={{ mx: 2, fontSize: [1, 2, 2] }} as="a">
              GitHub
            </LinkUI>
          </Link>
          <Link href="https://www.linkedin.com/in/michael-jannetta-9530881b7">
            <LinkUI sx={{ mx: 2, fontSize: [1, 2, 2] }} as="a">
              LinkedIn
            </LinkUI>
          </Link>
          <Link href="https://twitter.com/pratiqdev">
            <LinkUI sx={{ mx: 2, fontSize: [1, 2, 2] }} as="a">
              Twitter
            </LinkUI>
          </Link>
        </Flex>

        <Text sx={{ fontSize: 2, color: "grey_8", fontSize: [1, 2, 2] }}>
          Michael Jannetta @pratiqdev | 2021
        </Text>


      </Box>
    );
}
export default Footer
/** @jsxImportSource theme-ui */

//* react
import { useState, useEffect } from "react";

//* next
import Link from "next/link";
import {useRouter} from 'next/router'

//* theme
import { useThemeUI, Box, Button, Text, Link as L, Flex } from "theme-ui";
import styled from "@emotion/styled";

//* local deps
import {
  libInstallStatus,
  testStatus,
} from "../lib/install";

import Tipper from "./Tipper";
import MdeLogo from "./MdeLogo";
import ThemeToggle from "./ThemeToggle";
import InstallMenuItem from './InstallMenuItem'

//* external deps
import { MenuOutline } from "@emotion-icons/evaicons-outline/MenuOutline";
import { TwitterSquare as Twitter } from "@emotion-icons/fa-brands/TwitterSquare";
import { GithubSquare as Github } from "@emotion-icons/fa-brands/GithubSquare";
import { LinkedinSquare as Linkedin } from "@emotion-icons/boxicons-logos/LinkedinSquare";
import { Home } from "@emotion-icons/boxicons-regular/Home";
import { CloseOutline as Close } from "@emotion-icons/evaicons-outline/CloseOutline";
import { QuestionSquare } from "@emotion-icons/bootstrap/QuestionSquare";
import { File } from '@emotion-icons/boxicons-regular/File'
import { Settings } from '@emotion-icons/fluentui-system-regular/Settings'
import { Paperclip } from '@emotion-icons/boxicons-regular/Paperclip'

const NavMenu = (props) => {
  const [menuState, setMenuOpen] = useState(false);
  const router = useRouter()
 

  const toggleMenu = () => {
    // console.log(`NavMenu | toggle menu ${menuState}`)
    setMenuOpen(!menuState);

    document.body.style.overflow = menuState ? "auto" : "hidden";
  };

  //! this install flow / install status should be moved to the navbar since it is available pretty much everywhere and rendered immediately






  return (
    <>
      <Tipper color="dark" tip="Open the Main Menu">

      <Button
      id='halo-12'
        sx={{ zIndex: 1, mr:3 }}
        variant="icon.plain"
        onClick={(e) => {
          toggleMenu();
        }}
      >
        <MenuOutline size="30" />
      </Button>
      </Tipper>

      <Box
        sx={{
          position: "fixed",
          top: "0",
          right: "0",
          // transform: !menuState ? "translateX(100vw)" : "translateX(0vw)",
          opacity: !menuState ? "0" : "1",
          pointerEvents: !menuState ? "none" : "auto",
          minHeight: "100%",
          height: "100%",
          width: "100%",
          bg: "modal_t",
          transition: 1,
          overscrollBehavior: "contain",
        }}
        onClick={(e) => {
          toggleMenu();
        }}
      ></Box>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          right: "0",
          transform: !menuState ? "translateX(100vw)" : "translateX(0vw)",
          minHeight: "100%",
          height: "100%",
          width: ["100%", "auto", "auto"],
          maxWidth: ["100%", "20em", "20em"],
          overflowY: "none",
          display: "flex",
          flexDirection: "column",
          bg: "grey_0",
          borderLeft: ["none", "1px solid", "1px solid"],
          // borderBottom: ['none', '1px solid', "1px solid"],
          borderColor: "grey_15",
          transition: 1,
          zIndex: '100',
        }}
      >
        <Flex
          sx={{
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "grey_7",
            alignItems: 'center',
            p: 3,
            pr: 3,
          }}
        >
          <Box sx={{ height: "1em", ml: 3 }}>
            {/* <MdeLogo /> */}
          </Box>
          <Flex>
            <ThemeToggle />
            <Button
              variant="icon.plain"
              onClick={(e) => {
                toggleMenu();
              }}
            >
              <Close size="30" />
            </Button>
          </Flex>
        </Flex>
        <Box
          sx={{
            overflowY: "auto",
            overscrollBehavior: "contain",
            width: "auto",
          }}
        >

          














              {/* //* MENU OPTIONS ====================================================================================================================== */}
                {props.editor &&
                  <Button
                  variant="menuItem"
                  tabIndex="-1"
                  onClick={(e) => (props.showLoad ? props.showLoad() : null, toggleMenu())}
                  >
                    <Flex sx={{ alignItems: "center"}}>
                      <Flex sx={{ width: "3.5em", p:2, justifyContent: "center" }}>
                        <File size='22' />
                      </Flex>
                      Files
                    </Flex>
                  </Button>
                }


                {!props.editor &&
                  <Link href='/editor'>
                    <Text as="a">
                      <Button
                        variant="menuItem"
                        tabIndex="-1"
                        onClick={(e) => toggleMenu()}
                        >
                        <Flex sx={{ alignItems: "center"}}>
                          <Flex sx={{width: "3.5em", p:2,  justifyContent: "center" }}>
                          <Home size="24" />
                          </Flex>
                          Editor
                        </Flex>
                      </Button>
                    </Text>
                  </Link>
                }

                  <Button
                    variant="menuItem"
                    tabIndex="-1"
                    onClick={(e) => (props.showSettingsModal ? props.showSettingsModal() : null, toggleMenu())}
                  >
                    <Flex sx={{ alignItems: "center"}}>
                      <Flex sx={{ width: "3.5em", p:2, justifyContent: "center" }}>
                        <Settings size='22' />
                      </Flex>
                      Settings
                    </Flex>
                  </Button>


                  <Link href='/docs'>
                    <Text as="a">
                      <Button
                        variant="menuItem"
                        tabIndex="-1"
                        onClick={(e) => toggleMenu()}
                      >
                        <Flex sx={{ alignItems: "center"}}>
                          <Flex sx={{width: "3.5em", p:2, justifyContent: "center" }}>
                          <Paperclip size="24" />
                          </Flex>
                          Docs
                        </Flex>
                      </Button>
                    </Text>
                  </Link>

                  <Link href={{pathname: 'editor', query: {walkthrough: true}}}>
                    <Text as="a">
                      <Button
                        variant="menuItem"
                        tabIndex="-1"
                        onClick={(e) => toggleMenu()}
                      >
                        <Flex sx={{ alignItems: "center"}}>
                          <Flex sx={{width: "3.5em", p:2, justifyContent: "center" }}>
                          <Paperclip size="24" />
                          </Flex>
                          Walkthrough
                        </Flex>
                      </Button>
                    </Text>
                  </Link>

       


                  <Link href='/about' >
                    <Text as="a">
                      <Button
                        variant="menuItem"
                        tabIndex="-1"
                        onClick={(e) => toggleMenu()}
                      >
                        <Flex sx={{ alignItems: "center"}}>
                          <Flex sx={{ width: "3.5em", p:2,  justifyContent: "center" }}>
                            <QuestionSquare size="22" />
                          </Flex>
                            About
                        </Flex>
                      </Button>
                    </Text>
                  </Link>

          <InstallMenuItem />




















          {/* menu footer ===========================================================================================================*/}
          <Flex
            sx={{ mt: 9, width: "100%", p: 2, pr: 3, alignItems: "center" }}
          >
            <Link href="http://www.github.com/pratiqdev" passHref>
              <Tipper tip="GitHub" delay={[1000, 0]}>
                <Button variant="icon.plain" sx={{ m: 0 }}>
                  <Github size="22" />
                </Button>
              </Tipper>
            </Link>
            <Link href="https://www.linkedin.com/in/michael-jannetta-9530881b7" passHref>
              <Tipper tip="Linkedin" delay={[1000, 0]}>
                <Button variant="icon.plain" sx={{ m: 0 }}>
                  <Linkedin size="30" />
                </Button>
              </Tipper>
            </Link>

            <Link href="https://twitter.com/pratiqdev" passHref>
              <Tipper tip="Twitter" delay={[1000, 0]}>
                <Button variant="icon.plain" sx={{ m: 0, mr: 2 }}>
                  <Twitter size="20" />
                </Button>
              </Tipper>
            </Link>

            <Box sx={{fontSize: 2}}>@pratiqdev</Box>
          </Flex>

          

        </Box>
      </Box>
    </>
  );
};
export default NavMenu;

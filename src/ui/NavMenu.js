/** @jsxImportSource theme-ui */

//* react
import { useState, useEffect } from "react";

//* next
import Link from "next/link";

//* theme
import { useThemeUI, Box, Button, Text, Link as L, Flex } from "theme-ui";
import styled from "@emotion/styled";

//* local deps
import {
  libInstallStatus,
  testStatus,
} from "../lib/install";

import Tipper from "./Tipper";
import Logo from "./Logo";
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
import { Settings } from '@emotion-icons/fluentui-system-filled/Settings'

const NavMenu = (props) => {
  const [menuState, setMenuOpen] = useState(false);

 

  const toggleMenu = () => {
    // console.log(`NavMenu | toggle menu ${menuState}`)
    setMenuOpen(!menuState);

    document.body.style.overflow = menuState ? "auto" : "hidden";
  };

  //! this install flow / install status should be moved to the navbar since it is available pretty much everywhere and rendered immediately


  
  
      




  return (
    <>
      <Button
        sx={{ zIndex: 1 }}
        variant="icon.plain"
        onClick={(e) => {
          toggleMenu();
        }}
      >
        <MenuOutline size="30" />
      </Button>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          right: "0",
          // transform: !menuState ? "translateX(100vw)" : "translateX(0vw)",
          opacity: !menuState ? "0" : ".5",
          pointerEvents: !menuState ? "none" : "auto",
          minHeight: "100%",
          height: "100%",
          width: "100%",
          bg: "grey_0",
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
            p: 3,
            pr: 3,
          }}
        >
          <Box sx={{ width: "1.6em", ml: 2 }}>
            <Logo />
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

              <Button
                    variant="menuItem"
                    tabIndex="-1"
                    onClick={(e) => (props.showLoad ? props.showLoad() : null, toggleMenu())}
                  >
                    <Flex sx={{ alignItems: "center"}}>
                      <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
                        <File size='22' />
                      </Flex>
                      Load Document
                    </Flex>
                  </Button>


                  <Button
                    variant="menuItem"
                    tabIndex="-1"
                    onClick={(e) => (props.showSettingsModal ? props.showSettingsModal() : null, toggleMenu())}
                  >
                    <Flex sx={{ alignItems: "center"}}>
                      <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
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
                          <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
                          <Home size="24" />
                          </Flex>
                          Docs
                        </Flex>
                      </Button>
                    </Text>
                  </Link>


                  <Link href='/'>
                    <Text as="a">
                      <Button
                        variant="menuItem"
                        tabIndex="-1"
                        onClick={(e) => toggleMenu()}
                      >
                        <Flex sx={{ alignItems: "center"}}>
                          <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
                          <Home size="24" />
                          </Flex>
                          Home
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
                          <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
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
            sx={{ mt: 7, width: "100%", p: 2, pr: 3, alignItems: "center" }}
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

            <Text>@pratiqdev</Text>
          </Flex>

          

        </Box>
      </Box>
    </>
  );
};
export default NavMenu;

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  useThemeUI,
  Box,
  Flex,
  Text,
  Button,
  Link as LinkUI,
  Card,
} from "theme-ui";
import Navbar from "../src/ui/Navbar";

//==================================================================================
const Custom500 = () => {
  const router = useRouter();

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
    <Box sx={{ overflow: "hidden", height: "100vh" }}>
      <Navbar />
      <Flex
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundImage: backdrop,
        }}
      >
        <Text sx={{ fontSize: 10 }}>5 0 0</Text>
        <h2>Server-side error</h2>
        <Text
          sx={{
            mt: 3,
            mb: 4,
          }}
        >
          There was an error on the server.
        </Text>

        <Card variant="glass" sx={{ py: 3, px: 4, mt: 4 }}>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              mb: 2,
            }}
          >
            Possible causes:
          </Box>
          <ul>
            <li>It has moved to a new location</li>
            <li>The url was incorrect or misspelled</li>
            <li>It was removed by the author</li>
            <li>It never even existed</li>
          </ul>
        </Card>
        <Box sx={{ mt: 5, width: ["80vw", "50vw", "40vw"] }}>
          <Flex sx={{ justifyContent: "space-between", mb: 3, px: 3 }}>
            <Link href="/" passHref>
              <LinkUI as="a">Return to Home</LinkUI>
            </Link>
            <Link
              href="https://github.com/pratiqdev/portfolio-issues/issues/new"
              passHref
            >
              <LinkUI as="a">Report an issue</LinkUI>
            </Link>
          </Flex>
          <Button sx={{ width: "100%", py: 3 }} onClick={() => router.back()}>
            Go Back
          </Button>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            py: 4,
            px: 2,
          }}
        >
          Michael Jannetta @pratiqdev
        </Box>
      </Flex>
    </Box>
  );
};
export default Custom500;

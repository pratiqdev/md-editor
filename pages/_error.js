import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Flex, Text, Button, Link as LinkUI } from "theme-ui";
import Navbar from "../src/ui/Navbar";
import styled from '@emotion/styled'

//* emotion
const Wrap = styled(Box)`
  margin: 0;
  display: flex;
  height: 100vh;
`;

//==================================================================================
const Error = ({statusCode}) => {
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
    <Wrap sx={{}}>
      <Navbar />
      <Flex
        sx={{
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text sx={{ fontSize: 10 }}>{statusCode}</Text>
        <h2>Server-side error</h2>

        <Text
          sx={{
            m: 3,
          }}
        >
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </Text>

        <Text
          sx={{
            m: 3,
          }}
        >
          Possible causes:
          <ul>
            <li>It has moved to a new location</li>
            <li>It was removed by the author</li>
            <li>It was removed by the author</li>
          </ul>
        </Text>
        <Flex sx={{ mt: 3 }}>
          <Button onClick={() => router.back()}>Go Back</Button>

          <Link href="/">
            <a style={{ textDecoration: "none" }}>
              <Button>Return to Home</Button>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Wrap>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

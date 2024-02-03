import { useEffect } from "react"
import { Box, useColorMode, useThemeUI, Button } from "theme-ui"
import styled from '@emotion/styled'

import { Sun } from '@emotion-icons/bootstrap/Sun'
import { Moon } from "@emotion-icons/entypo/Moon";






const ThemeToggle = (props) => {
  // const [colorMode, setColorMode] = useColorMode()
  const context = useThemeUI()
  const { theme, components, colorMode, setColorMode } = context

  // useEffect(() => {
  //   setColorMode(colorMode)
  // }, [])
  // console.log(`ThemeToggle | mode: ${colorMode}`)
  
  const next = colorMode === "dark" ? "light" : "dark";

  useEffect(() => {
    // document.documentElement.classList.add(colorMode);
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [colorMode]);

  return (
    <Button id='halo-11'
    suppressHydrationWarning={true}
    sx={{zIndex: 2}} variant='icon.plain' onClick={(e) => {
      setColorMode(next);
    }}>
      {next !== "dark" ? ( // check for dark mode instead of light. it may return as 'default' instead of 'light'
        <Sun
          size="25"
          title="Toggle theme"
          suppressHydrationWarning={true}

 
        />
      ) : (
        <Moon
          size="25"
          title="Toggle theme"
          suppressHydrationWarning={true}


        />
      )}
    </Button>
  );
}

export default ThemeToggle

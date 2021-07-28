import { useEffect } from "react"
import theme from "../theme/Theme"
import { Box } from "theme-ui"
import PropTypes from "prop-types"
import Head from "./Head"
import ThemeToggle from "../ui/ThemeToggle"
import Main from "./Main"



const Layout = (props) => {


  return (
    <>
      <Head {...props} />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: 'center',
        }}
      >
        <ThemeToggle />


        <Main>{props.children}</Main>

        
      </Box>

      {/* <Style /> */}
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default Layout

import { Box } from "theme-ui"

const Container = (props) => (
  <Box {...props} sx={{ width: '100%', maxWidth: "1000px", mx: "auto", minHeight: '90vh', pt: 2, px: [3, 2, 2]}} />
)

export default Container

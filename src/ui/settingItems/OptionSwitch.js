import { useState, useEffect } from "react";
import { Flex, Box, Input, Switch, Button, Select } from "theme-ui";
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretRight } from "@emotion-icons/boxicons-regular/CaretRight";

const OptionSwitch = ({ s, si, handle }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [newOption, SetNewOption] = useState(s.options[s.state].shortName);

  const closeAndHandle = (si, newState) => {
    setShowOptions(!showOptions);
    SetNewOption(s.options[newState].shortName);
    handle(si, newState);
  };

  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
        border: "1px solid #444",
        color: "grey_15",
        bg: "grey_0",
        mb: 2,
        p: 1,
        py: 2,
      }}
    >
      <Flex sx={{ alignItems: "center" }}>
        <Flex
          sx={{ width: "100%", alignItems: 'center', }}
          
        >
          <Button 
          variant='icon.primary'
          onClick={() => setShowDetails(!showDetails)}
          sx={{ mr: 2, }}>
            {showDetails ? <CaretDown size="22" /> : <CaretRight size="22" />}
          </Button>
          <Box
            sx={{
              borderBottom: "1px solid",
              borderColor: showDetails ? "grey_8" : "transparent",
            }}
          >
            {s.name}
          </Box>
        </Flex>
        <Button
          variant="outline.primary"
          sx={{
            whiteSpace: "nowrap",
            fontWeight: "body",
            overflow: "hidden",
            width: '14rem',
            mr: 2,
          }}
          onClick={() => setShowOptions(!showOptions)}
        >
          {newOption}
        </Button>
      </Flex>

      {showDetails && (
        <Box sx={{ color: "grey_10", p: 2 }}>
          <Flex sx={{ fontSize: 1 }}>{s.group}</Flex>
          <Flex sx={{ fontSize: 2 }}>{s.desc}</Flex>
        </Box>
      )}
      {showOptions && (
        <Box sx={{ m: 2, mr: 3 }}>
          {s.options.map((x, i) => (
            <Button
              onClick={() => closeAndHandle(si, i)}
              variant="plain"
              sx={{
                bg: s.state === i ? "grey_4" : "grey_1",
                width: "100%",
                mb: 1,
                textAlign: "left",
              }}
            >
              {x.name}
            </Button>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default OptionSwitch;

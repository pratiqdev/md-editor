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
        color: "grey_15",
        bg: "grey_0",
        p: 1,
        py: 2,

        border: '1px solid transparent', 
        borderLeft: '3px solid transparent', 
        borderLeftColor: showDetails ? 'primary_b' : 'transparent',
        borderBottomColor: 'grey_2',
        '&:hover':{
            bg: 'grey_2'
        }
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
              cursor: 'default',
              borderBottom: "1px solid",
              borderColor: showDetails ? "grey_8" : "transparent",
            }}
          >
            {s.name}
          </Box>
        </Flex>
        <Button
          variant="outline.secondary"
          sx={{
            whiteSpace: "nowrap",
            fontWeight: "body",
            overflow: "hidden",
            width: '13.6rem',
            color: 'grey_15',
            '&:hover':{
              color: 'grey_0',
            },
            mr: 2,
            fontSize: [1,1,1],
          }}
          onClick={() => setShowOptions(!showOptions)}
        >
          {newOption}
        </Button>
      </Flex>

      {showDetails && (
        <Box sx={{ color: "grey_10", p: 2 }}>
          <Flex sx={{ fontSize: 1 }}>{s.group}</Flex>
          <Flex sx={{ fontSize: 2, textAlign: 'left' }}>{s.desc}</Flex>
        </Box>
      )}
      {showOptions && (
        <Box sx={{ m: 2, mr: 3, }}>
          {s.options.map((x, i) => (
            <Box sx={{borderTop:'1px solid', borderColor: 'grey_4'}}>
            <Button
              onClick={() => closeAndHandle(si, i)}
              variant="secondary"
              sx={{
                bg: s.state === i ? "grey_4" : "grey_1",
                width: "100%",
                m:0,
                textAlign: "left",
                fontWeight: 'body',
                justifyContent: 'flex-start',
                color: 'grey_15',
                '&:hover':{
                  color: 'grey_0',
                },
                borderRadius: 0,
                fontSize: [1,1,1],
              }}
            >
              {x.name}
            </Button>
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  );
};

export default OptionSwitch;

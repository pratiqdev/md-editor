import { useState, useEffect, useRef } from "react";

// THEME ____________________________________________________________________________________
import {
  Flex,
  Box,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  Button,
  Link as LinkUI,
} from "theme-ui";
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media";

// LOCAL ____________________________________________________________________________________
import Navbar from "../src/ui/Navbar";
import dataList from "../src/lib/documentation";
import MDX from "@mdx-js/runtime";

// EXTERNAL ____________________________________________________________________________________
import { debounce, cloneDeep } from "lodash";
import marked from "marked";
import { truncate } from "lodash";
import { CaretDown } from "@emotion-icons/boxicons-regular/CaretDown";
import { CaretUp } from "@emotion-icons/boxicons-regular/CaretUp";

const uniqueGroups = [...new Set(dataList.map((item) => item.group))];

let docString = "";



const components = {
    Box: (props) => <Box {...props} />,
    pre: (props) => <div {...props} />,
    // code: CodeBlock,
    blockquote: (props) => <BlockQuote {...props} />,
    img: (props) => <ImageBox {...props} />,
    
    // Alert,
    // Scrollable,
    // Coder,
    // Link,
    // LinkUI
  } 













//~ Collapsible menu item elements  /////////////////////////////////////////////////////////////////////////
const DocMenuItemCollapse = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(props.allItemsCollapsed);

  const toggleCollapse = () => {
    props.collapseAll();
    setTimeout(() => {
      setIsCollapsed(!isCollapsed);
    }, 1);
  };

  useEffect(() => {
    setIsCollapsed(props.allItemsCollapsed);
  }, [props.trigger]);

  return (
    <Flex
      key={props.group}
      sx={{
        flexDirection: "column",
        p: 1,
        px: 4,
      }}
    >
      {isCollapsed && (
        <Flex
          sx={{
            fontWeight: "bold",
            color: "primary_a",
            p: 0,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LinkUI key={props} href={`#${props.group}`}>
            {props.group.toUpperCase()}
          </LinkUI>
          <Button
            variant="icon.primary"
            sx={{ color: "primary_a" }}
            onClick={() => toggleCollapse()}
          >
            <CaretDown size="22" />
          </Button>
        </Flex>
      )}

      {!isCollapsed && (
        <Flex sx={{ flexDirection: "column" }}>
          <Flex
            sx={{
              fontWeight: "bold",
              color: "primary_a",
              justifyContent: "space-between",
            }}
          >
            <LinkUI key={props.group} href={`#${props.group}`}>
              {props.group.toUpperCase()}
            </LinkUI>
            {props.canCollapse && (
              <Button
                variant="icon.primary"
                sx={{ color: "primary_a" }}
                onClick={() => toggleCollapse()}
              >
                <CaretUp size="22" />
              </Button>
            )}
          </Flex>

          {dataList
            .filter((item) => item.group === props.group)
            .map((item, index) => (
              <LinkUI
                key={item.name}
                sx={{
                  fontSize: ".8rem !important",
                  textDecoration: "none",
                  mb: 2,
                }}
                href={`#${item.name
                  .toString()
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                {item.name}
              </LinkUI>
            ))}
        </Flex>
      )}
    </Flex>
  );
};













//~  docs menu  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const DocMenu = (props) => {
  const breakIndex = useBreakpointIndex();

  const [allItemsCollapsed, setAllItemsCollapsed] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [canCollapse, setCanCollapse] = useState(true);

  const collapseAll = () => {
    console.log("collapseAll");
    setTrigger(!trigger);
  };

  useEffect(() => {
    if (breakIndex <= 0) {
      setAllItemsCollapsed(true);
      setCanCollapse(true);
      setTrigger(!trigger);
    } else {
      setAllItemsCollapsed(false);
      setCanCollapse(false);
      setTrigger(!trigger);
    }
  }, [breakIndex]);

  return (
    <Flex
      sx={{
        // borderRight: '1px solid #888',
        position: ["relative", "absolute", "absolute"],
        left: "0",
        width: ["100vw", "35vw", "25vw"],
        top: ["", "10rem", "10rem"],
        bottom: "0",
        overflow: "hidden",
        maxHeight: "93vh",
        flexDirection: "column",
        p: 2,
        bg: "grey_2",
        mt: [4, 0, 0],
      }}
    >
      {uniqueGroups.map(
        (group, index) =>
          group && (
            <DocMenuItemCollapse
              group={group}
              collapseAll={collapseAll}
              allItemsCollapsed={allItemsCollapsed}
              trigger={trigger}
              canCollapse={canCollapse}
            />
          )
      )}
    </Flex>
  );
};













//~ generate groups ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const generateGroups = debounce(
  (sv) => {
    console.log(`-------------------------------------------------`);
    docString = "";
    uniqueGroups.map((group, index) => generateSections(group, sv));
  },
  50,
  { leading: true, trailing: true, maxWait: 500 }
);













//~ generate sections ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const generateSections = (val, sv) => {
  dataList
    //* check if item matches group
    .filter((item) => val === item.group)
    //* filter for search term
    .filter((item) => {
      if (!sv || sv[0] === "" || sv.length == 0) {
        return true;
      } else {
        return sv
          .map(
            (s) =>
              item.content.toLowerCase().includes(s.toLowerCase()) ||
              item.name.toLowerCase().includes(s.toLowerCase()) ||
              val.toLowerCase().includes(s.toLowerCase())
          )
          .includes(true);
      }
    })
    //* replace search terms with a highlighted version


    //! Working on highlighting the matching word withou affecting its style or content in the document
    // .map(item => {

        // let TEMP_ITEM = cloneDeep(item)


        // // console.log(`current item`, item.content)
        // if (sv && sv.length !== 0 && sv[0] !== "" ) {

        //     sv.forEach((term)=>{


        //             // prevent matches for small words like i a an to or
        //             if(term.length >= 2){

                        
        //                 let moddedTerm = `${term}`
        //                 let reg = new RegExp(moddedTerm, 'i')
        //                 console.log(reg)
                    
        //                 // have to abandon this replacement if the text is inside of a link path / href
                        
        //                 //find all matches of the regex
        //                 let matchedTerm = TEMP_ITEM.content.match(reg)
                        
        //             // loop through each term
        //             matchedTerm.forEach((mt, i)=> {
        //                 TEMP_ITEM.content = TEMP_ITEM.content.replace(reg, `__${matchedTerm[i]}__`)
        //             })
                    
        //         }
        //     })

        //     return TEMP_ITEM
             
        //   }else{

        //     return item
        //   }







    // })


    .map((item, index) => {
      if (index === 0) {
        h1(val);
      }

      item.name && h2(item.name);
      item.content && append(item.content);
    });
};













//~ appenders ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const append = (val) => {
  docString += `\r\n ${val} \r\n`;
};

const h1 = (val) => {
  val = val.toUpperCase();
  docString += `\r\n # ${val} \r\n`;
};

const h2 = (val) => {
  docString += `\r\n ## ${val} \r\n`;
};

const h3 = (val) => {
  docString += `\r\n#### ${val} \r\n`;
};













//~ documentation page   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Docs = (props) => {
  const [searchValue, setSearchValue] = useState();
  const [content, setContent] = useState("");


  //* refine search --------------------------------------------------------------------
  const refineSearch = (val) => {
   
    let sv = val
      .replace(/ /g, "%%")
      .split("%%")
      .filter(
        (s) =>
          s !== "" && s !== "the" && s !== "is" && s !== "when" && s !== "or"
      );

    setSearchValue(sv);
  };

  generateGroups(searchValue);

  return (
    <Box sx={{ bg: "grey_4", height: "100vh" }}>
      <Navbar />
      <Box sx={{ overflowX: "hidden" }}>
        <Box
          sx={{
            fontSize: "2rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          Documentation
        </Box>

        <Input
          sx={{
            maxWidth: "30rem",
            mx: "auto",
            mt: 3,
            textAlign: "center",
            bg: "grey_1",
          }}
          onChange={(e) => refineSearch(e.target.value)}
        />

        <DocMenu />

        <Box
          sx={{
            bottom: "0",
            right: "0",
            top: ["0", "10rem", "10rem"],
            position: ["relative", "absolute", "absolute"],
            left: ["0", "35vw", "25vw"],
            width: ["100vw", "65vw", "75vw"],
            maxHeight: ["auto", "93vh", "93vh"],
            p: 5,
            pt: 1,
            overflow: "auto",
            overflowY: "auto",
            borderColor: "grey_1",
            bg: "grey_0",
          }}
        >
          <MDX
          //  components={components}
          >
            {docString}
          </MDX>

          <Box sx={{ p: 5, bg: "grey_4", m: -5, mt: 3 }}>
            Made By Michael Jannetta @pratiqdev/mdd
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Docs;

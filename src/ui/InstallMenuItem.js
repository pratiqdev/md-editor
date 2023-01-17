//* react
import {useState, useEffect } from 'react'

//* next
import Link from "next/link";

//* theme
import { useThemeUI, Box, Button, Text, Link as L, Flex } from "theme-ui";
import styled from "@emotion/styled";

//* local
import {
    showInstallPrompt,
    openWithApp,
    libInstallStatus
  } from "../lib/install";

//* external
import { QuestionSquare } from "@emotion-icons/bootstrap/QuestionSquare";
import { CloudDownload } from "@emotion-icons/bootstrap/CloudDownload";
import { TabletMobileCombo } from "@emotion-icons/entypo/TabletMobileCombo";


const InstallMenuItem = () => {


    const [installText, setInstallText] = useState("Checking for App")
    const [installIcon, setInstallIcon] = useState(<QuestionSquare size="22" />)
    const [installEvent, setInstallEvent] = useState(false)


    useEffect(()=>{
        console.log(`recieved status: ${libInstallStatus}`)
                
        if (
            libInstallStatus === "can-be-installed" 
            ) {
            setInstallText("Install the App")
            setInstallIcon(<CloudDownload size="22" />)
            setInstallEvent(() => showInstallPrompt)
            }
            
            if (
                libInstallStatus === "app-already-installed" 
            ) {
                setInstallText("Open with App")
                setInstallIcon(<TabletMobileCombo size="22" />)
                setInstallEvent(() => openWithApp)
        }

    }, [libInstallStatus])



    if(libInstallStatus !== 'no-status-yet'){

        return (
            <>
                <Button
                variant="menuItem"
                tabIndex="-1"
                onClick={installEvent && installEvent}
                >
                <Flex sx={{ alignItems: "center"}}>
                    <Flex sx={{ width: "2.5em", justifyContent: "center" }}>
                    {installIcon}
                    </Flex>
                    {installText}
                </Flex>
                </Button>
            </>
        );
    }else{
        return null
    }
  };

  export default InstallMenuItem

import { Image, Link, List, useColorMode } from "@chakra-ui/react";
import { ListItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import React, { Fragment, useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import logoDark from "../../assets/svg/logo-dark.svg";



function Navigation({connected}) {
    const { colorMode } = useColorMode();
    //use state to set dark mode
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
    if (colorMode === "dark") {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
    }, [colorMode]);
    console.log(connected)
    return (
        <Box as='nav' backgroundColor="#83a697" color='#FFFFFF' h='4rem' display="flex" alignItems='center' justifyContent="space-between" pr='.5rem'>
            <Link p='.5rem' h='full' minW='fit-content' href="/">
                <Image h='full' src={/*darkMode ? logoDark : logo*/ logoDark} alt="je suis le logo lelolel"/>
            </Link>
            
            <List display="flex" gap='3' alignItems='center'>
                {connected?
                <Fragment>
                    <ListItem>
                        <a href="/profil">Profil</a>
                    </ListItem>
                    <ListItem>
                        <a href="/logout">Logout</a>
                    </ListItem>
                </Fragment>
                :
                <Fragment>
                    <ListItem>
                        <a href="/login">Login</a>
                    </ListItem>
                    <ListItem>
                        <a href="/register">Register</a>
                    </ListItem>
                </Fragment>
                }
                {/* <ListItem>
                    <ColorModeSwitcher/>
                </ListItem> */}
            </List>
        </Box>
    );
}

export default Navigation;
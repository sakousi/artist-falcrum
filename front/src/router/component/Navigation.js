import { Image, Link, List, useColorMode } from "@chakra-ui/react";
import { ListItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import React, { useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import logoDark from "../../assets/svg/logo-dark.svg";



function Navigation() {
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

    return (
        <Box as='nav' h='4rem' display="flex" alignItems='center' justifyContent="space-between">
            <Link p='.5rem' h='full' minW='fit-content' href="/">
                <Image h='full' src={darkMode ? logoDark : logo} alt="je suis le logo lelolel"/>
            </Link>
            <List display="flex" gap='3' alignItems='center'>
                <ListItem>
                    <a href="/login">Login</a>
                </ListItem>
                <ListItem>
                    <a href="/register">Register</a>
                </ListItem>
                <ListItem>
                    <ColorModeSwitcher/>
                </ListItem>
            </List>
        </Box>
    );
}

export default Navigation;
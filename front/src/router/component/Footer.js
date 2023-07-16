import { Box, Image, List, ListItem, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/svg/logo-dark.svg";

export default function Footer() {
    return (
        <Box w='full' backgroundColor='#83a697' p='1rem 5rem' color='#fff'>
            <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center'>
                    <Image w='8rem' src={logo} />
                </Box>
                <List display='flex' flexDirection='column'>
                    <ListItem>
                        <Link>Qui sommes nous ?</Link>
                    </ListItem>
                    <ListItem>
                        <Link>FAQ</Link>
                    </ListItem>
                    <ListItem>
                        <Link>Nous contacter</Link>
                    </ListItem>
                </List>
                <List display='flex' flexDirection='column'>
                    <ListItem>
                        <Link>CGU</Link>
                    </ListItem>
                    <ListItem>
                        <Link>Mentions legales</Link>
                    </ListItem>
                </List>
                <List display='flex' flexDirection='column'>
                    <ListItem>
                        <Link>Facebook</Link>
                    </ListItem>
                    <ListItem>
                        <Link>Instagram</Link>
                    </ListItem>
                    <ListItem>
                        <Link>Twitter</Link>
                    </ListItem>
                </List>
            </Box>
            <Box>
                
            </Box>
        </Box>
    );
}
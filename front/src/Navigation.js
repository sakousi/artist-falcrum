import { Flex } from "@chakra-ui/react";
import { List } from "@chakra-ui/react";
import { ListItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import React from "react";

function Navigation() {
  return (
    <nav>
        <Flex>
            <Box>
                <img src="" alt=""/>
            </Box>
            <List display="flex">
                <ListItem>
                    <a href="/">Home</a>
                </ListItem>
                <ListItem>
                    <a href="/login">Login</a>
                </ListItem>
                <ListItem>
                    <a href="/register">Register</a>
                </ListItem>
            </List>
        </Flex>
    </nav>
  );
}

export default Navigation;
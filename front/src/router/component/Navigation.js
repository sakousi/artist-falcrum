import { Box, Button, FormControl, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, List, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, UnorderedList, background, useColorMode, useDisclosure } from "@chakra-ui/react";
import { ListItem } from "@chakra-ui/react";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import React, { Fragment, useEffect, useState } from "react";
import logo from "../../assets/svg/logo.svg";
import logoDark from "../../assets/svg/logo-dark.svg";
import { CURRENT_USER, USERS } from "../../graphql/queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FaSearch } from "react-icons/fa";
import PageLoader from "../PageLoader";



function Navigation({connected}) {
    const { colorMode } = useColorMode();

    const { isOpen, onToggle, onClose } = useDisclosure();

    const [search, setSearch] = useState([])


    //use state to set dark mode
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
    if (colorMode === "dark") {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
    }, [colorMode]);

    const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(CURRENT_USER);
    const [seachUser , { loading: searchUserLoading, error: searchUserError, data: searchUserData }] = useLazyQuery(USERS, {variables: {pseudo: search}});

    if (currentUserLoading || searchUserLoading) return <PageLoader/>;
    if (currentUserError) return <p>Error 500: An error occured while prossesing information of current user</p>;
    if (searchUserError) return <p>Error 500: An error occured while prossesing information of searched user</p>;

    const currentUser = currentUserData.currentUser;

    let searchedUser
    if(searchUserData){
        searchedUser = searchUserData.getUsersByName
    }

    console.log(currentUser)

    if(currentUser){
        connected = true
    }
    
    return (
        <Box as='nav' backgroundColor="#83a697" color='#FFFFFF' h='4rem' display="grid" alignContent={'center'}  gridTemplateColumns={'repeat(3, 1fr)'} pr='.5rem'>
            <Link p='.5rem' h='full' w='6rem' href="/">
                <Image h='full' src={logoDark} alt="je suis le logo lelolel"/>
            </Link>
            <Box alignSelf={'center'}>
                <Popover
                    returnFocusOnClose={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    closeOnBlur={false}
                >
                    <PopoverTrigger>
                        <InputGroup backgroundColor={'#FFF'} borderRadius={'.5rem'}>
                            <Input type='text' color={'#000'} value={search} variant={'filled'} onChange={e => setSearch(e.target.value)} placeholder='Search user...'/>
                            <Button onClick={e => {
                                seachUser();
                                onToggle()
                            }} >
                                <InputRightElement
                                    pointerEvents='none'
                                    children={<FaSearch color='#000' />}
                                />
                            </Button>
                        </InputGroup>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverBody>
                            <UnorderedList>
                                {searchedUser && searchedUser.map(user => (
                                    <ListItem key={user.id}>
                                        <Link color={'#000'} w={'full'} _hover={{backgroundColor : '#fafafa'}} href={`/profil/${user.id}`}>{user.pseudo}</Link>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
            <List justifySelf={'end'} display="flex" gap='5' alignItems='center'>
                {connected?
                <Fragment>
                    <ListItem>
                        <a href="/newpost">Create-Post</a>
                    </ListItem>
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
                <ListItem>
                    <ColorModeSwitcher/>
                </ListItem>
            </List>
        </Box>
    );
}

export default Navigation;
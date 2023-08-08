import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React, { Fragment, useContext } from "react";
import Navigation from "./component/Navigation";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../graphql/queries";
import { FunctionContext } from "../context/functionContext";

function CurrentProfil() {

  const functionContext = useContext(FunctionContext);
  const profilImages = functionContext.importAll(require.context('../assets/img/profil', false, /\.(png|jpe?g|svg)$/));

  const {data: dataCurrentUser, loading: loadingCurrentUser, error: errorCurrentUser} = useQuery(CURRENT_USER);

  if (loadingCurrentUser) return <p>Loading...</p>;
  if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;

  const currentUser = dataCurrentUser.currentUser;

  return (
    <Fragment>
      <Box height="100%" display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={5} m={'5rem'}>
        <Box display={'flex'} justifyContent={'center'}>
          <Image src={profilImages[currentUser.image]} borderRadius={'.5rem'} maxH={'75vh'}/>
        </Box>
        <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} flexDirection={'column'} justifyContent={'center'}>
          <Heading as="h1" pb='1rem' gridColumn={'1 / span2'} alignSelf={'center'} justifySelf={'center'}>Profil</Heading>
          <Box alignSelf={'start'} justifySelf={'center'}>
            <Text>Pseudo: {currentUser.pseudo}</Text>
            <Text>Mail: {currentUser.email}</Text>
            <Text>Firstname: {currentUser.firstname}</Text>
            <Text>Lastname: {currentUser.lastname}</Text>
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={2} alignSelf={'start'} justifySelf={'center'}>
            <Button>View all posts</Button>
            <Button>Change password</Button>
            <Button>Change profil picture</Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

export default CurrentProfil;
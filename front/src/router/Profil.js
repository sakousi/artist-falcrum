import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./component/Navigation";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { CURRENT_USER, USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { FunctionContext } from "../context/functionContext";

export default function Profil() {
    const {userId} = useParams()

    const functionContext = useContext(FunctionContext);
    const profilImages = functionContext.importAll(require.context('../assets/img/profil', false, /\.(png|jpe?g|svg)$/));

    //query current user
    const {data: dataCurrentUser, loading: loadingCurrentUser, error: errorCurrentUser} = useQuery(CURRENT_USER);
    //query user
    const {data: dataUser, loading: loadingUser, error: errorUser} = useQuery(USER, { variables: { id: parseInt(userId) } });

    if (loadingCurrentUser || loadingUser) return <p>Loading...</p>;
    if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;
    if (errorUser) return <p>Error 500: An error occured while prossesing information of user</p>;

    const currentUser = dataCurrentUser.currentUser;
    const user = dataUser.getUser;

    console.log(user)

    return (
      <Fragment>
        <Box height="100%" display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={5} m={'5rem'}>
          <Box display={'flex'} justifyContent={'center'}>
            <Image src={profilImages[user.image]} borderRadius={'.5rem'} maxH={'75vh'}/>
          </Box>
          <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} flexDirection={'column'} justifyContent={'center'}>
            <Heading as="h1" pb='1rem' gridColumn={'1 / span2'} alignSelf={'center'} justifySelf={'center'}>Profil</Heading>
            <Box alignSelf={'start'} justifySelf={'center'}>
              <Text>Pseudo: {user.pseudo}</Text>
              <Text>Mail: {user.email}</Text>
              <Text>Firstname: {user.firstname}</Text>
              <Text>Lastname: {user.lastname}</Text>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={2} alignSelf={'start'} justifySelf={'center'}>
            </Box>
          </Box>
        </Box>
      </Fragment>
    )
}
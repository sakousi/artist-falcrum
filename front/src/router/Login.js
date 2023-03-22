import React, { Fragment } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { CURRENT_USER } from "../graphql/queries";
import Navigation from "./component/Navigation";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      console.log(login);
      cache.writeQuery({
        query: CURRENT_USER,
        data: { currentUser: login.user },
      });
    },
    onCompleted(data) {
      localStorage.setItem("isConnected", true);
      console.log(data);
      navigate("/redirectLogin");
    }
  });

  return (
    <Box h='100vh'>
      <Navigation/>
      <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
        <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' mt='5rem' p='1rem' w='35%' backgroundColor='#EEEEEE'>
        <Text as='h1' fontFamily='Poppins' fontSize='2rem'>Login</Text>
        <Text as='h2'>Welcome back dear artist</Text>
        <form onSubmit={e => {
          e.preventDefault();
          login({
            variables: {
              email: e.target.email.value,
              password: e.target.password.value
            }
          });
        }}>
          <Box>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="email" />
          </Box>
          <Box>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="password" />
          </Box>
          <Button backgroundColor='#FFFFFF' type="submit">Login</Button>
        </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import Navigation from "./component/Navigation";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [register] = useMutation(REGISTER, {
    update(cache, {data: register}){
      console.log(register)
    },
    onCompleted(data) {
      navigate("/login");
    }
  });
  return (
    <Box h='100vh'>
      <Navigation/>
      <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
        <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' mt='5rem' p='1rem' w='35%' backgroundColor='#EEEEEE'>
        <Text as='h1' fontFamily='Poppins' fontSize='2rem'>Register</Text>
        <Text as='h2'>Hello new artist</Text>
        <form onSubmit={e => {
          e.preventDefault();;
        }}>
          <Box>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="JohnDoe" />
          </Box>
          <Box>
            <label htmlFor="firstname">Firstname:</label>
            <input type="text" name="firstname" id="firstname" placeholder="John" />
          </Box>
          <Box>
            <label htmlFor="lastname">Lastname:</label>
            <input type="text" name="lastname" id="lastname" placeholder="Doe" />
          </Box>
          <Box>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="john.doe@labmda.com" />
          </Box>
          <Box>
            <label htmlFor="email">Phone:</label>
            <input type="phone" name="phone" id="phone" placeholder="+33 7 77 77 77 77" />
          </Box>
          <Box>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="password1234" />
          </Box>
          <Box>
            <label htmlFor="confrim-password">Confirm Password:</label>
            <input type="password" name="confrim-password" id="confrim-password" placeholder="password1234" />
          </Box>
          <Button backgroundColor='#FFFFFF' type="submit">Register</Button>
        </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
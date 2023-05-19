import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";

import { gql, useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import Navigation from "./component/Navigation";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      console.log(login);
    },
    onCompleted(data) {
      localStorage.setItem("isConnected", true);
      console.log(data);
      //TODO: whlie cookie token is not set not redirect to home
      navigate("/");
    }
  });

  return (
    <Box h='100vh'>
      <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
        <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' mt='5rem' p='1rem' w='35%' backgroundColor='#EEEEEE'>
          <Text as='h1' fontFamily='Poppins' fontSize='2rem'>Login</Text>
          <Text as='h2'>Welcome back dear artist</Text>
          <Formik
            initialValues={{ email: '', password: ''}}
            onSubmit={(values, actions) => {
              login({
                variables: {
                  email: values.email,
                  password: values.password
                }
              })
            }}>
            {(props) => (
              <Form>
                <Field name='email'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Email</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='email' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Password</FormLabel>
                      <Input backgroundColor='#fff' {...field} type="password" placeholder='password' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
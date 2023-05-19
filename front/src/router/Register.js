import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
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
      <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
        <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' mt='5rem' p='1rem' w='35%' backgroundColor='#EEEEEE'>
        <Text as='h1' fontFamily='Poppins' fontSize='2rem'>Register</Text>
        <Text as='h2'>Hello new artist</Text>
        <Formik
            initialValues={{ pseudo: '', firstname: '', lastname: '', email: '', phone: '', password: '' }}
            onSubmit={(values, actions) => {
              register({
                variables: {
                  pseudo: values.pseudo,
                  firstname: values.firstname,
                  lastname: values.lastname,
                  email: values.email,
                  phone: values.phone,
                  password: values.password,
                }
              })
            }}>
            {(props) => (
              <Form>
                <Field name='pseudo'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Pseudo</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='pseudo' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='firstname'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Firstname</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='firstname' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='lastname'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Lastname</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='lastname' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='email'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Email</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='email' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='phone'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel>Phone</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='phone' />
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
        {/* <FormControl onSubmit={e => {
          e.preventDefault();;
          register({
            variables: {
              pseudo: e.target.username.value,
              firstname: e.target.firstname.value,
              lastname: e.target.lastname.value,
              email: e.target.email.value,
              phone: e.target.phone.value,
              password: e.target.password.value,
            }
          })
        }}>
          <Box display='flex' flexDirection='column' gap={2}>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" placeholder="JohnDoe" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="firstname">Firstname:</label>
              <input type="text" name="firstname" id="firstname" placeholder="John" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="lastname">Lastname:</label>
              <input type="text" name="lastname" id="lastname" placeholder="Doe" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" placeholder="john.doe@labmda.com" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="email">Phone:</label>
              <input type="phone" name="phone" id="phone" placeholder="+33 7 77 77 77 77" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" id="password" placeholder="password1234" />
            </Box>
            <Box display='flex' flexDirection='column'>
              <label htmlFor="confrim-password">Confirm Password:</label>
              <input type="password" name="confrim-password" id="confrim-password" placeholder="password1234" />
            </Box>
            <Button backgroundColor='#FFFFFF' type="submit" w='fit-content' alignSelf='center'>Register</Button>
          </Box>
        </FormControl> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Register;
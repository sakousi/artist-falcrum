import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import React from "react";
import Navigation from "./component/Navigation";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations";
import { useNavigate } from "react-router-dom";

import * as Yup from 'yup'

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

  const FormShema = Yup.object().shape({
    pseudo: Yup.string().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  })


  return (
    <Box>
      <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
        <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' my={"1rem"} p='1rem' w='35%' backgroundColor='#EEEEEE'>
        <Text as='h1' fontFamily='Poppins' fontSize='2rem'>Register</Text>
        <Text as='h2'>Hello new artist</Text>
        <Formik
            initialValues={{ pseudo: '', firstname: '', lastname: '', email: '', phone: '', password: '', confirmPassword: '' }}
            validationSchema={FormShema}
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
                    <FormControl isInvalid={form.errors.pseudo && form.touched.pseudo}>
                      <FormLabel>Pseudo</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='pseudo' />
                      <FormErrorMessage>{form.errors.pseudo}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='firstname'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.firstname && form.touched.firstname}>
                      <FormLabel>Firstname</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='firstname' />
                      <FormErrorMessage>{form.errors.firstname}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='lastname'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.lastname && form.touched.lastname}>
                      <FormLabel>Lastname</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='lastname' />
                      <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='email'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='email' />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='phone'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                      <FormLabel>Phone</FormLabel>
                      <Input backgroundColor='#fff' {...field} placeholder='phone' />
                      <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='password'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Password</FormLabel>
                      <Input backgroundColor='#fff' {...field} type="password" placeholder='password' />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='confirmPassword'>
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                      <FormLabel>Confirm password</FormLabel>
                      <Input backgroundColor='#fff' {...field} type="password" placeholder='Confirm password' />
                      <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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

export default Register;
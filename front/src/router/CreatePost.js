import React, { useRef, Fragment } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";

import axios from 'axios';

import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_POST } from "../graphql/mutations";
import { CURRENT_USER } from "../graphql/queries";
import PageLoader from "./PageLoader";
import { useNavigate } from "react-router-dom";
import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";


function CustomFileInput({ field, form, ...props }){
    console.log(field)


    if(field.value !== ""){

    const fileReader = new FileReader()
    fileReader.readAsDataURL(field.files[0])
    fReader.onloadend = function(event){
        var img = document.getElementById("media");
        img.src = event.target.result;
    }

    }

    const fileInputRef = useRef()

    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        form.setFieldValue(field.name, file);
        form.setFieldValue('fileName', file.name);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    }

  return (
    <Fragment>
      <Input type="file" accept="image/*" onChange={handleChange} {...field} {...props} display="none" ref={fileInputRef} />
      <Button as="label" htmlFor={field.name} colorScheme="teal" cursor="pointer" size="sm" onClick={handleClick}>
        {field.value ? 'Change File' : 'Upload File'}
      </Button>
      <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
    </Fragment>
  );
}

export default function CreatePost() {
    const formRef = useRef()

    const [createPost] = useMutation(CREATE_POST);
    const { data: currentUserData, loading: currentUserLoading , error: currentUserError } = useQuery(CURRENT_USER)

    const navigate = useNavigate();

    if (currentUserLoading) return <PageLoader/>;
    if (currentUserError) return <Text>Error 500: An error occured while prossesing information of current user</Text>;

    const currentUser = currentUserData.currentUser;




    const handleSubmition = async (values, actions) => {

        const formData = new FormData();
        formData.append('media', values.media);
        formData.append('fileName', values.fileName);
        
        console.log(formData);
        console.log(values.media);

        axios.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const fileName = await response.json();
        console.log(fileName);

        createPost({
            variables: {
                media: fileName,
                title: values.title,
                content: values.content,
                userId: parseInt(currentUser.id)
            },
            onCompleted(data) {
                navigate(`post/${data.createPost.id}`)
            }
        })
    }


    return (
        <Fragment>
            <Box w='full' h='max-content' display='flex' justifyContent='center' alignItems='center'>
                <Box borderRadius='.25rem' display='flex' flexDirection="column" alignItems='center' mt='5rem' p='1rem' w='35%' backgroundColor='#EEEEEE'>
                <Formik
                    initialValues={{ media: '', title: '', content: ''}}
                    onSubmit={handleSubmition}>
                {(props) => (
                    <Form encType="multipart/form-data">
                        <Field name='media' id="media" component={CustomFileInput}/>
                        <Field name='title'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel>Title</FormLabel>
                                    <Input backgroundColor='#fff' {...field}/>
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='content'>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel>Content</FormLabel>
                                    <Input backgroundColor='#fff' {...field}/>
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
        </Fragment>
    );
}
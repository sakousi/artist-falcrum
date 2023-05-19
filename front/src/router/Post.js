import React, { Fragment, useRef, useState } from "react";
import Navigation from "./component/Navigation";
import { useParams } from 'react-router-dom';
import { COMMENTS, CURRENT_USER, POST } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Avatar, Box, Button, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { CREATE_COMMENT } from "../graphql/mutations";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/img/posts', false, /\.(png|jpe?g|svg)$/));
const imagesUsers = importAll(require.context('../assets/img/profil', false, /\.(png|jpe?g|svg)$/));

export default function Post() {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [comment, setComment] = useState('')

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    let { postId } = useParams();
    postId = parseInt(postId);

    const {data: dataPost, loading: loadingPost, error: errorPost} = useQuery(POST , { variables: { id: postId }, });
    const {data: dataCurrentUser, loading: loadingCurrentUser, error: errorCurrentUser} = useQuery(CURRENT_USER);
    const {data: dataComments, loading: loadingComments, error: errorComments} = useQuery(COMMENTS, { variables: { postId: postId }, });
    
    const [createComment, {data: dataComment, loading: loadingComment, error: errorComment}] = useMutation(CREATE_COMMENT)

    if (loadingPost || loadingCurrentUser || loadingComments) return <p>Loading...</p>;
    if (errorPost) return <p>Error 500: An error occured while prossesing information of post</p>;
    if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;
    if (errorComments) return <p>Error 500: An error occured while prossesing information of comments</p>;

    const post = dataPost.getPost;
    const currentUser = dataCurrentUser.currentUser;
    const comments = dataComments.getComments;

    console.log(comments);

    return (
        <Fragment>
            <Box as="section" display={'grid'} gap={5} gridTemplateColumns={'repeat(2, 1fr)'} mx="1.5rem">
                <Box placeSelf={'center'} w='full'>
                    <Heading as='h1'>{post.title}</Heading>
                    <Text>{post.content}</Text>
                    <Box p='1' w='full' display='flex' justifyContent='space-between'>
                        <Box display='grid' gridTemplateColumns='repeat(3 , 1fr)' gap='1'>
                            <Button backgroundColor='#E4E4E4' onClick={
                                () => {
                                    if(!currentUser) return alert('You must be connected to like a post');
                                    
                                }
                            }><i className="fa-regular fa-heart"></i></Button>
                            <Button backgroundColor='#E4E4E4'><i className="fa-regular fa-comment"></i></Button>
                        </Box>
                        <Box>
                            <Button backgroundColor='#E4E4E4'><i className="fa-solid fa-exclamation"></i></Button>
                        </Box>
                    </Box>
                </Box>
                <Box placeSelf={'center'}>
                    <Image src={images[post.media]} maxW={"80vw"} maxH={"75vh"} placeSelf={'center'} />
                </Box>
            </Box>
            <Box as="section" mx="1.5rem">
                <Heading>Comments: 
                 <Button onClick={e => {
                    if(!currentUser) return alert('You must be connected to comment a post');
                    onOpen()
                }} >Add Comment</Button>
                </Heading>
                <Box>

                {comments.map((comment, index) => (
                    <Box key={index} display='grid' gridTemplateColumns='repeat(2, 1fr)' gap='1'>
                        <Box>
                            <Text><Avatar name="user" src={imagesUsers['dave.jpg']} ></Avatar></Text>
                            <Text as='h3' >{comment.content}</Text>
                        </Box>
                        <Box>
                            <Button backgroundColor='#E4E4E4'><i className="fa-regular fa-heart"></i></Button>
                            <Button backgroundColor='#E4E4E4'><i className="fa-solid fa-exclamation"></i></Button>
                        </Box>
                    </Box>
                ))
                }
                </Box>
            </Box>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Your comment</FormLabel>
                            <Input ref={initialRef} value={comment} placeholder='Comment' onChange={e => {setComment(e.target.value)}} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={e => {
                            createComment({ variables: { content: comment, userId: currentUser.id, postId: postId } });
                            onClose()
                        }}>
                            Send
                        </Button>
                        <Button onClick={onClose}>Abort</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );
}
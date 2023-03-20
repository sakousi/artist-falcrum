import React, { Fragment, useContext } from 'react';
import Navigation from './component/Navigation';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import { CurrentUserContext } from '../CurrentUserContext';
import { gql, useQuery } from '@apollo/client';
import { POSTS } from '../graphql/queries';


function Home() {
  const {currentUser} = useContext(CurrentUserContext);
  console.log(currentUser);

  const { data, loading, error } = useQuery(POSTS, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>LOADING</p>;
  if (error) {
    throw new Error(error);
    };

  const posts = data.getPosts;
  console.log(posts);

  return (
    <Fragment>
      <Navigation justifySelf="flex-start"/>
      <p>{currentUser?currentUser.username:"no user"}</p>
      <Box w='full' display='flex' flexDirection='column' alignItems='center'>
        <Box w='full' display='flex' justifyContent='flex-end' maxW='4xl' py='10'>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Most Liked</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Newest</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        {posts.map((post) => (
        <Card w='lg' mb={10}>
          <CardHeader>
            <Heading>{post.title}</Heading>
          </CardHeader>
          <CardBody display='flex' flexDirection='column'>
            <Image
            src={post.media}
            borderRadius='lg'
            />
            <Text>{post.content}</Text>
          </CardBody>
          <CardFooter display='flex' flexDirection='column'>
            <Text>30 Likes</Text>
            <Box p='1' w='full' display='flex' justifyContent='space-between'>
              <Box display='grid' gridTemplateColumns='repeat(3 , 1fr)' gap='1'>
                <Button><i className="fa-regular fa-heart"></i></Button>
                <Button><i className="fa-regular fa-comment"></i></Button>
                <Button><i className="fa-regular fa-bookmark"></i></Button>
              </Box>
              <Box>
                <Button><i className="fa-solid fa-exclamation"></i></Button>
              </Box>
            </Box>
          </CardFooter>
        </Card>
          ))}
      </Box>
    </Fragment>
  );
}

export default Home;
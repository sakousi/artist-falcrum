import React, { Fragment, useContext } from 'react';
import Navigation from './component/Navigation';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import { CurrentUserContext } from '../CurrentUserContext';
import { gql, useQuery } from '@apollo/client';
import { POSTS } from '../graphql/queries';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/img/posts', false, /\.(png|jpe?g|svg)$/));

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
      <Box w='full' display='flex' flexDirection='column' alignItems='center'>
        <Box w='full' display='flex' justifyContent='flex-end' maxW='4xl' py='10'>
          <Breadcrumb color='#3A5A72'>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Most Liked</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Newest</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        {posts.map((post) => (
        <Card backgroundColor='#EEEEEE' w='lg' mb={10}>
          <CardHeader>
            <Heading color='#3A5A72'>{post.title}</Heading>
          </CardHeader>
          <CardBody display='flex' flexDirection='column'>
            <Image
            src={images[post.media]}
            borderRadius='lg'
            />
            <Text>{post.content}</Text>
          </CardBody>
          <CardFooter display='flex' flexDirection='column'>
            <Text>30 Likes</Text>
            <Box p='1' w='full' display='flex' justifyContent='space-between'>
              <Box display='grid' gridTemplateColumns='repeat(3 , 1fr)' gap='1'>
                <Button backgroundColor='#FFFFFF'><i className="fa-regular fa-heart"></i></Button>
                <Button backgroundColor='#FFFFFF'><i className="fa-regular fa-comment"></i></Button>
                <Button backgroundColor='#FFFFFF'><i className="fa-regular fa-bookmark"></i></Button>
              </Box>
              <Box>
                <Button backgroundColor='#FFFFFF'><i className="fa-solid fa-exclamation"></i></Button>
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
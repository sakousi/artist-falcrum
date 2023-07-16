import React, { Fragment, useContext } from 'react';
import Navigation from './component/Navigation';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { POSTS, CURRENT_USER, GET_LIKES } from '../graphql/queries';
import ArtCard from './component/ArtCard';
import { FunctionContext } from '../context/functionContext';
import Footer from './component/Footer';



function Home() {
  const functionContext = useContext(FunctionContext);
  const postImages = functionContext.importAll(require.context('../assets/img/posts', false, /\.(png|jpe?g|svg)$/));

  const { loading: loadingCurrentUser, error: errorCurrentUser, data: dataCurrentUser } = useQuery(CURRENT_USER);
  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(POSTS);


  if (loadingCurrentUser || loadingPost) return <Spinner/>;
  if (errorPost) return <p>Error 500: An error occured while prossesing information of post</p>;
  if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;

  const posts = dataPost.getPosts;
  const currentUser = dataCurrentUser.currentUser;

  console.log(posts);
  console.log(currentUser);

  return (
    <Fragment>
      <Box w='full' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
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
        {posts.map((post, key) => (
          <ArtCard post={post} key={key} currentUser={currentUser} />
          ))}
      </Box>
    </Fragment>
  );
}

export default Home;
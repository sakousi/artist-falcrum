import React, { Fragment } from 'react';
import Navigation from './component/Navigation';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { POSTS, CURRENT_USER, GET_LIKES } from '../graphql/queries';
import ArtCard from './component/ArtCard';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/img/posts', false, /\.(png|jpe?g|svg)$/));

function Home() {

  const { loading: loadingCurrentUser, error: errorCurrentUser, data: dataCurrentUser } = useQuery(CURRENT_USER);
  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(POSTS);


  if (loadingCurrentUser || loadingPost) return <p>Loading...</p>;
  if (errorPost) return <p>Error 500: An error occured while prossesing information of post</p>;
  if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;

  const posts = dataPost.getPosts;
  const currentUser = dataCurrentUser.currentUser;

  console.log(posts);
  console.log(currentUser);

  return (
    <Fragment>
      <Navigation connected={currentUser?true:false}/>
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
        {posts.map((post, key) => (
          <ArtCard post={post} key={key} currentUser={currentUser} images={images} />
          ))}
      </Box>
    </Fragment>
  );
}

export default Home;
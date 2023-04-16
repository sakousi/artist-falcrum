import React, { Fragment } from 'react';
import Navigation from './component/Navigation';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from '@chakra-ui/react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { POSTS, CURRENT_USER, GET_LIKES } from '../graphql/queries';
import { CREATE_LIKE } from '../graphql/mutations';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/img/posts', false, /\.(png|jpe?g|svg)$/));

function Home() {

  const { loading: loadingCurrentUser, error: errorCurrentUser, data: dataCurrentUser } = useQuery(CURRENT_USER);
  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(POSTS);
  const [getLikes, { loading: loadingLikes, error: errorLikes, data: dataLikes }] = useLazyQuery(GET_LIKES);

  const [addLike, { loading: loadingLike, error: errorLike, data: dataLike }] = useMutation(CREATE_LIKE)

  if (loadingCurrentUser || loadingPost || loadingLikes) return <p>Loading...</p>;
  if (errorPost) return <p>Error 500: An error occured while prossesing information of post</p>;
  if (errorCurrentUser) return <p>Error 500: An error occured while prossesing information of current user</p>;
  if (errorLikes) return <p>Error 500: An error occured while prossesing information of likes</p>;

  const posts = dataPost.getPosts;
  const currentUser = dataCurrentUser.currentUser;

  console.log(posts);
  console.log(currentUser);

  function postLikes(postId){
    getLikes({ variables: { postId: postId } });
    if (loadingLikes) return <p>Loading...</p>;
    if (errorLikes) return <p>Error 500: An error occured while prossesing information of likes</p>;
    return dataLikes.getLikes.length;
  }

  return (
    <Fragment>
      <Navigation justifySelf="flex-start" connected={currentUser?true:false}/>
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
        <Card key={key} backgroundColor='#EEEEEE' w='lg' mb={10}>
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
            <Text>{postLikes(post.id)} Likes</Text>
            <Box p='1' w='full' display='flex' justifyContent='space-between'>
              <Box display='grid' gridTemplateColumns='repeat(3 , 1fr)' gap='1'>
                <Button backgroundColor='#FFFFFF' onClick={
                  () => {
                    if(!currentUser) return alert('You must be connected to like a post');
                    addLike({
                      variables: {
                        userId: currentUser.id,
                        postId: post.id
                      }
                    })
                  }
                }><i className="fa-regular fa-heart"></i></Button>
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
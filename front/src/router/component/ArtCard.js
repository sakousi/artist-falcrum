import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text } from "@chakra-ui/react";
import { GET_LIKES } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_LIKE } from "../../graphql/mutations";

export default function ArtCard({post, images, currentUser}){
    const postId = post.id;
    const { loading: loadingLikes, error: errorLikes, data: dataLikes } = useQuery(GET_LIKES, { variables: { postId } });

    const [addLike, { loading: loadingLike, error: errorLike, data: dataLike }] = useMutation(CREATE_LIKE)

    if (loadingLikes) return <p>Loading...</p>;
    if (errorLikes) return <p>Error 500: An error occured while prossesing information of likes</p>;

    const likes = dataLikes.getLikes
    console.log(likes);
    
    //fucntion returning the legnth of likes array
    const getCount = () => {
        if(likes.length === 0) return 0;
        return likes.length;
    }

    const checkLiked = (likes, user) => {
        if (user == undefined) return false;
        let liked = false
        likes.forEach(like => {
            if(user.id === like.user.id) liked = true;
            else liked = false;
        });
        if(liked === true){
            return true;
        }else{
            return false;
        }
    }

    return (
        <Card backgroundColor='#EEEEEE' w='lg' mb={10}>
            <CardHeader>
                <Heading color='#3A5A72'>{post.title}</Heading>
            </CardHeader>
            <CardBody display='flex' flexDirection='column' as={'a'} href={`/post/${post.id}`}>
                <Image
                src={images[post.media]}
                borderRadius='lg'
                />
                <Text>{post.content}</Text>
            </CardBody>
            <CardFooter display='flex' flexDirection='column'>
                <Text>{getCount()} Likes</Text>
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
                        }><i className={checkLiked(likes, currentUser)?'fa-solid fa-heart':'fa-regular fa-heart'}></i></Button>
                        <Button backgroundColor='#FFFFFF'><i className="fa-regular fa-comment"></i></Button>
                        <Button backgroundColor='#FFFFFF'><i className="fa-regular fa-bookmark"></i></Button>
                    </Box>
                    <Box>
                        <Button backgroundColor='#FFFFFF'><i className="fa-solid fa-exclamation"></i></Button>
                    </Box>
                </Box>
            </CardFooter>
        </Card>
    )
}
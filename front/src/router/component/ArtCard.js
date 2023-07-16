import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { CREATE_LIKE } from "../../graphql/mutations";
import { FunctionContext } from "../../context/functionContext";
import { useContext } from "react";


export default function ArtCard({post, currentUser}){
    const postId = post.id;

    const functionContext = useContext(FunctionContext);
    const postImages = functionContext.importAll(require.context('../../assets/img/posts', false, /\.(png|jpe?g|svg)$/));
    const profilImages = functionContext.importAll(require.context('../../assets/img/profil', false, /\.(png|jpe?g|svg)$/));

    const [addLike] = useMutation(CREATE_LIKE)

    const likes = post.likes
    
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
        <Card backgroundColor='#EEEEEE' w='5xl' mb={10} display='grid' gridTemplateColumns='repeat(2, 1fr)'>
            <Stack>
                <CardBody display='flex' flexDirection='column'>
                    <Link href={`profil/${post.user.id}`} display={'flex'} alignItems={'center'} gap={1}>
                        <Avatar src={profilImages[post.user.image]}/>
                        <Text textTransform={'capitalize'}>{post.user.pseudo}</Text>
                    </Link>
                    <Heading color='#3A5A72'>{post.title}</Heading>
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
            </Stack>
            <Box
            _hover={{
                backgroundColor: '#FFFFFF'
            }}
            >
                <Link href={`post/${post.id}`}>
                    <Image
                    src={postImages[post.media]}
                    borderRadius='lg'
                    />
                </Link>
            </Box>
        </Card>
    )
}
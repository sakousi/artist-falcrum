import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export default function PageLoader(){
    return (
        <Box display={'flex'} w={'full'} h={'100vh'} justifyContent={'center'} alignItems={'center'}>
            <Spinner 
            size='xl'
            thickness='5px'
            emptyColor='#F1F1F1'
            speed='0.70s'
            />
        </Box>
    )
}
import React, { Fragment } from "react";
import Navigation from "./component/Navigation";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import SVG from '../assets/svg/404.svg'

export default function NotFound() {

    return (
        <Fragment>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} w={'full'} h={'30rem'} backgroundColor={'#F5F5F5'}>
                <Image src={SVG} />
                <Heading>Error 404 - Page Not Found</Heading>
                <Text>Erreur 404 - Page non trouvée</Text>
            </Box>
        </Fragment>
    );
}
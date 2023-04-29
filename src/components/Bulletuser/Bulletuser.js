import { Box, CloseButton, Text } from "@chakra-ui/react";
import React from "react";

const Bulletuser = (user) => {
  // console.log(user)
  return (
    <Box
      px={2}
      mx='1'
      my='1'
      py={1}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bg="#6643b5"
      borderRadius={"7px"}
      color="white"
    >
      <Text
        fontSize={"0.7rem"}
        fontFamily={"sans-serif"}
        px="0.5"
        py="1"
        border
        fontWeight="bold"
      >
        {user.user.name}
      </Text>
      
      <CloseButton onClick={user.handleFunction}  size="sm" px="0.5" color={"white"} />
    </Box>
  );
};

export default Bulletuser;

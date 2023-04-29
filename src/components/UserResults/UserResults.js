import { Avatar, Box, Text, background } from "@chakra-ui/react";
// import {useContext} from "react";
// import {UserContext} from '../../App'

const UserResults = (user) => {
  return (
    
    <Box
      onClick={user.handleFunction}
      display={"flex"}
      cursor={'pointer'}
      w="100%"
      bg='#E8E8E8'
      px="1"
      alignItems="center"
      _hover={{
        background:"#8594e4",
        color:"white"
      }}
      m="2.5"
      borderWidth='7px'
      borderRadius='7px'
    >
      <Avatar size="sm" name={user.user.name} src={user.user.pic}></Avatar>
      <Box paddingLeft='0.5rem' display={"flex"} flexDirection={"column"}>
        <Text>{user.user.name}</Text>
        <Text fontSize={'sm'}>
          <b>Email: </b>
          {user.user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserResults;

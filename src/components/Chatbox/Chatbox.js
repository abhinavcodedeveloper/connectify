import React, { useContext } from 'react'
import { Box, LinkBox } from '@chakra-ui/react'
import { UserContext } from '../../App';
import SingleChat from '../SingleChat.js/SingleChat';
const Chatbox = ({fetchAgain,setFetchAgain}) => {
  const { state, dispatch, chatselect, setChatselect, chats, setChats } =
    useContext(UserContext);

  return (
  <Box
  display={{
    base: chatselect ? "flex" : "none",
    md: "flex",
    lg:"flex"
  }}
  flexDirection={"column"}
  p="0.5rem"
  ml='3'
  borderWidth="0.5rem"
  borderRadius="2xl"
  alignItems={"center"}
  w={{ base: "100%", md: "60%",lg:"80%" }}
  bg="white"
>
<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>

  </Box>
  )
}

export default Chatbox
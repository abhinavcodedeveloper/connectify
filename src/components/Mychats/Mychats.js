import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import GroupchatModal from "../../Global/groupchatModal";
import { checkGroupchat } from "../Checkgroupchat/Checkgroupchat";
import Loader from "../../Global/Loader";

const Mychats = ({fetchAgain}) => {
  const { state, dispatch, chatselect, setChatselect, chats, setChats } =
    useContext(UserContext);
  const [logged, setLogged] = useState();
  const toast = useToast();

  const fetchChats = () => {
    fetch("/allchats", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
      })
      .catch((err) => {
        toast({
          title: "Error occured while getting chat",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      });
  };

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{
        base: chatselect ? "none" : "flex",
        md: "flex",
        lg:"flex"
      }}
      flexDirection={"column"}
      p="0.5rem"
      borderWidth="0.5rem"
      borderRadius="2xl"
      alignItems={"center"}
      w={{ base: "100%", md: "30%" }}
      bg="white"
      overflow={"hidden"}
      overflowY={"scroll"}
    >
      
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems="center"
        w="100%"
        p="0.7rem"
        fontSize="2xl"
      >
        <Text>Chats Section</Text>

        <GroupchatModal>
          <Button display={"flex"} fontSize={{base:'1rem',md:'0.7rem',lg:'1rem'}} p="1" marginEnd="0.5rem" rightIcon={<AddIcon/>}>
            New Group
          </Button>
        </GroupchatModal>
      </Box>
      <Box display={"flex"} flexDirection={"column"} width={"100%"} px={"5"}  >
        {
          chats
          ?
          chats.map((chat)=>(
            
            <Box
            onClick={()=>setChatselect(chat)}
            cursor="pointer"
            display={"flex"}
            flexDir={"column"}

            px='4'
            py='3.5'
            my='1 '
            borderWidth='0.1rem'
            borderRadius='7px'
            bg={chatselect===chat? "#8594e4" : "#e0ebeb"}
            color={chatselect===chat? "white" : "black"}
            >
              <Text>
              {!chat.isGroupChat
              ?
             checkGroupchat(logged,chat.users)
            :
            chat.chatName}
            </Text>
            </Box>
          ))
          :
          <Loader/>
        }
      </Box>
    </Box>
  );
};

export default Mychats;

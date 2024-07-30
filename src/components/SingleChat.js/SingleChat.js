import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  checkGroupchatuser,
  checkGroupchat,
} from "../Checkgroupchat/Checkgroupchat";
import ProfileModal from "../../Global/profileModal";
import UpdategroupModal from "../../Global/UpdategroupModal";
import Mainchat from "../Mainchat/Mainchat";
import io from "socket.io-client";
import './SingleChat.css'
const Endpoint = "http://localhost:4444";
var socket, chatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { state, chatselect, setChatselect } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();

  

  // fetching all messages
  const fetchChats = () => {
    if (!chatselect) {
      return;
    }

    setLoading(true);
    fetch(`/${chatselect._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMessages(data);
        socket.emit("join the chat", chatselect._id);
      })
      .catch((err) => {
        toast({
          title: "Error fetching chats",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
      });
  };

  const sendMessage = (event) => {
    if (event.key === "Enter" && newMessage.length > 0) {
      fetch("/chat", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          chatid: chatselect._id,
          content: newMessage
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNewMessage("");
          // this will contain all the messages that have been sent by the user
          socket.emit("new Message",data)
          console.log(data)
          setMessages([...messages, data]);
        })
        .catch((err) => {
          toast({
            title: "Error sending message",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
        });
    }
  };
  useEffect(() => {
    socket = io(Endpoint);
    socket.emit("setupChat", state);
    socket.on("connected", () => setSocketConnected(true));
  }, []); 

  useEffect(() => {
    fetchChats();
    chatCompare = chatselect
  }, [chatselect]);

  
  useEffect(() => {
    socket.on("message received",(messageRec)=>{
      if(!chatCompare || chatCompare._id !== messageRec.chat._id){
        // notification functionality
      }
      else{
        setMessages([...messages,messageRec])
      }
    })      
  });
  



  const typinghandle = (e) => {
    setNewMessage(e.target.value);
    // typing functionality here
  };
  return (
    <Box>
      {chatselect ? (
        <Box>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontFamily="Work sans"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setChatselect("")}
            />
            {chatselect?(
            !chatselect.isGroupChat ? (
              <>
                {checkGroupchat(state, chatselect.users)}
                {/* user profile  */}
                <ProfileModal
                  user={checkGroupchatuser(state, chatselect.users)}
                />
              </>
            ) : (
              <>
                {chatselect.chatName.toUpperCase()}
                <UpdategroupModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  messages={messages}
                />
              </>
            )):(
              <Text>chat is not selected</Text>
            )}
          </Text>

          <Box className="chatSection"
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p="3"
            w="70vw"
            h="65vh"
            borderRadius="lg"
            overflowY="hidden"
            
          >
            {loading ? (
              <Spinner alignSelf="center" m="auto" size="xl" />
            ) : (
              <>
                <Box
                  display={"flex"}
                  flexDir="column"
                  overflowY='scroll'
                >
                  <Mainchat messages={messages} />
                </Box>
              </>
            )}
            <FormControl onKeyDown={sendMessage} isRequired>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message"
                onChange={typinghandle}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100%"}
          className="chatSection"
        >
          <Text fontSize="3xl">Click to start the Conversation</Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;

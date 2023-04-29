import {
    Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import UserResults from "../components/UserResults/UserResults";
import Bulletuser from "../components/Bulletuser/Bulletuser";

const GroupchatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupName, setGroupName] = useState();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { state, chats, setChats } = useContext(UserContext);

  const handleSearch = async(srch) => {
    setSearch(srch)
    if (!srch) {
      return;
    }

    else{
        setLoading(true)
        fetch(`/user?search=${search}`,{
          headers:{
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(data=>{
        //   console.log(data)
          setLoading(false)
          setResult(data)
        }).catch(err=>{
          console.log(err)
        })
      }
  };

  const handleSubmit = ()=>{
    // groupName and selectedUsers
    if(!groupName||!selectedUsers){
        toast({
            title: "Please fill all fields",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
    }

    fetch('/groupchat',{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            name:groupName,
            allusers:JSON.stringify(selectedUsers.map(u=>u._id))
        })
    }).then(res=>res.json())
    .then(data=>{
        setChats([data,...chats])
        toast({
            title: "Group created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
        onClose();
    })
    .catch(err=>{
        toast({
            title: "Failed to create group",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
    })
  }

  const handleDelete = (deluser)=>{
    // filtering it
    setSelectedUsers(selectedUsers.filter((u)=>u._id !== deluser._id))
  }

  const handleGroupchat = (userToAdd)=>{
    if(selectedUsers.includes(userToAdd)){
        toast({
            title: "User already exists",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          });
          return;
    }

    setSelectedUsers([...selectedUsers,userToAdd])
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group</ModalHeader>

          <ModalBody>
            <FormControl>
              <Input
                placeholder="Group Name"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
              placeholder="Add Users Eg: Akshat,Ravish,etc" 
              onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* groupresultsshown */}
            <Box
            w="100%"
            display={"flex"}
            flexWrap={"wrap"}
            >
            {
                selectedUsers.map(user=>(
                    
                    <Bulletuser
                    key={user._id}
                    user={user}
                    handleFunction={()=>handleDelete(user)}
                    />
                    ))
                }
                {
                    loading
                    ?
                    <span>loading</span>
                    :
                    result?.slice(0,4).map(user=>(
                    //    { console.log(data)}
                        <UserResults
                        key={user._id}
                        user={user}
                        handleFunction = {()=>handleGroupchat(user)}
                        />
                    ))
                }
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} >
              Close
            </Button>
            <Button variant="ghost" onClick={()=>handleSubmit()}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupchatModal;

import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Bulletuser from "../components/Bulletuser/Bulletuser";
import UserResults from "../components/UserResults/UserResults";

const UpdategroupModal = ({ fetchAgain, setFetchAgain,messages }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, chatselect, setChatselect } = useContext(UserContext);
  const [groupName, setGroupName] = useState();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [renameloading, setRenameloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = (deluser) => {
    // filtering it
    // setChatselect(chatselect.users.map.filter((u)=>u._id !== deluser._id))
  };
  // searching 
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



  const handleRename = () => {
    if (!groupName) {
      toast({
        title: "Please Write something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setRenameloading(true);
    fetch("/renameGroup", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        groupName: groupName,
        chatid: chatselect._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setChatselect(data);
        setFetchAgain(!fetchAgain);
        setRenameloading(false);
      })
      .catch((err) => {
        toast({
          title: "Can't Rename it",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top-left",
        });
        setRenameloading(false);
      });
    setGroupName("");
  };

  const handleAdduser = (adduser)=>{
    if(chatselect.users.find(u=>u._id === adduser._id)){
      toast({
        title: "User already exists",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    // if it is not a groupAdmin
    if(state._id !== chatselect.groupAdmin._id){
    
      toast({
        title: "Only Admin can add user",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setLoading(true);
    fetch('/adduser',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        chatid:chatselect._id,
        userid:adduser
      })
    }).then(res=>res.json())
    .then(data=>{
      setChatselect(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    })
    .catch(err=>{
      toast({
        title: "Can't add user",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false)
    })
  }

  
  const handleSubmit = () => {};

  const handleRemove = (user) => {
    // if groupAdmin is user
    if(chatselect.groupAdmin._id !== state._id && user._id !== state._id ){
      toast({
        title: "Only Admin can remove user",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    setLoading(true)
    fetch('/removeUser',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        chatid:chatselect._id,
        userid:user._id
      })
    }).then(res=>res.json())
    .then(data=>{
      if(user._id === state._id){
        setChatselect()
      }
      else{
        
        setChatselect(data)
      }
      setFetchAgain(!fetchAgain)
      messages();
      setLoading(false)
    })
    .catch(err=>{
      toast({
        title: "Can't remove user",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false)
      
    })
  };
  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{chatselect.chatName}</ModalHeader>
          <ModalBody>
            {/* showing all users */}
            <Box display={"flex"} flexWrap={"wrap"} p="2" w="100%">
              {chatselect.users.map((user) => (
                <Bulletuser
                  key={user._id}
                  user={user}
                  admin={user.groupAdmin}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
              
            </Box>
            <FormControl display={"flex"} p="1.5" w="100%">
              <Input
                placeholder="Update Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Button colorScheme="green" isLoading={renameloading} onClick={() => handleRename()}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input placeholder="Add users" onChange={(e)=>handleSearch(e.target.value)} />
            </FormControl>
            {
                    loading
                    ?
                    (
                      <Spinner size="lg"/>
                    )
                    :
                    result?.slice(0,4).map(user=>(
                    //    { console.log(data)}
                        <UserResults
                        key={user._id}
                        user={user}
                        handleFunction = {()=>handleAdduser(user)}
                        />
                    ))
                }
          
                
          </ModalBody>

          <ModalFooter>
            <Button variant="solid" colorScheme="red" onClick={()=>handleRemove(state)}>
              Delete Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdategroupModal;

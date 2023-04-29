import { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { UserContext } from "../App";
import ProfileModal from "./profileModal";
import Loader from "./Loader";
import UserResults from "../components/UserResults/UserResults";


 
const Sidedrawer = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { state,dispatch,chatselect,setChatselect,chats,setChats} = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [result,setResult] = useState([])
  const [loadingchat, setLoadingchat] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast()

  const searchUser = () =>{
    if(!search){
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
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
        setLoading(false)
        setResult(data)
      }).catch(err=>{
        console.log(err)
      })
    }
   
  } 
  
  //one on one chat
  const chataccess = (userid)=>{
    setLoadingchat(true)
    fetch('/singlechat',{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        userid:userid
      })
    }).then(res=>res.json())
    .then(data=>{
      // console.log(data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setChatselect(data)
      setLoadingchat(false)
      onClose();
    })
    .catch(err=>{
      toast({
        title: "Error occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    });
    }
  
  
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="7px"
      >
        <Tooltip label="Search" hasArrow placement="bottom-end">
          <Button colorScheme="blue" variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text p="0px 5px">Search User</Text>
          </Button>
        </Tooltip>
        <Text className="chato" fontSize={"2xl"}>
          Chato
        </Text>
        <div className="rightbox">
          <Menu>
            <MenuButton
              fontSize={"2xl"}
              p="1"
              marginEnd="0.5rem"
              rightIcon={<ChevronDownIcon />}
            >
              <BellIcon />
            </MenuButton>
            <MenuButton as={Button}>
              <Avatar size="sm" name={state.name} src={state.pic}></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={state}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Main sidedrawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} justifyContent={'space-between'} pb={"2"}>
              <FormControl>
              <Input 
              type="text"
              placeholder="Type something"
              value={search}
              onChange={(e)=>setSearch(e.target.value)} />
              </FormControl>
              <Button   onClick={()=>searchUser()}>Go</Button>
            </Box>
            {
              loading
              ?
              <Loader/>
              :
              (
                result?.map((user)=>(
                
                 <UserResults
                key={user._id}
                p='1rem'
                user={user}
                handleFunction={()=>chataccess(user._id)}
                />
                )))
            }
             {loadingchat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidedrawer;

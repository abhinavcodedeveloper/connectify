import { useContext, useState } from "react"; 
import { UserContext } from "../../App";
import Chatbox from "../Chatbox/Chatbox";
import Mychats from "../Mychats/Mychats";
import Sidedrawer from "../../Global/Sidedrawer";
import { Box } from "@chakra-ui/react";


const Chatpage = () => {
    const {state,dispatch} = useContext(UserContext)
    const [fetchAgain,setFetchAgain] = useState(false)
    // basically it will help us to fetch the chats again 
  return (
    <div style={{width:"100%"}}>
        {state && <Sidedrawer/>}
        <Box
        display={"flex"}
        justifyContent={"space-between"}
        w='100%'
        h='80vh'
        p='1rem'
        >
            {state && <Mychats fetchAgain={fetchAgain}/>}
            {state && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
        
    </div>
  )
}

export default Chatpage
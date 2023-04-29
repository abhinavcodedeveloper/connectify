import { Avatar, Box, Text, Tooltip } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { UserContext } from '../../App'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../Checkgroupchat/Checkgroupchat'

const Mainchat = ({messages}) => {
    const {state} = useContext(UserContext)
  return (
    <ScrollableFeed>
        {messages?.map((m,i)=>(
          
            <Box display={"flex"} key={m.id}>
                 {(isSameSender(messages, m, i, state._id) ||
              isLastMessage(messages, i, state._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === state._id ? "#B9F5D0" : "#BEE3F8"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, state._id),
                marginTop: isSameUser(messages, m, i, state._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
            </Box>
        ))}
    </ScrollableFeed>
  )
}

export default Mainchat
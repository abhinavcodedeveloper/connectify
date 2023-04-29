import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({user,children}) => {
 
        const { isOpen, onOpen, onClose } = useDisclosure()
        return (
          <>
          {
          children
          ?
           <span onClick={onOpen}>{children}</span>
        :
        (
          <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )}
            
      
            <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontSize='2rem'>{user.name}</ModalHeader>
                <ModalBody>
                <Image h='20vh' borderRadius={'full'} w='40%' m='auto' src={user.pic}></Image>
                <Text pt='3rem' fontFamily='fantasy' fontSize='1.4rem' textAlign='center'>Email: {user.email}</Text>
                </ModalBody>
                
                <ModalFooter>
                  <Button  variant='ghost' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      }
  

export default ProfileModal
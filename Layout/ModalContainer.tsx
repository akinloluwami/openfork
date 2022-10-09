import { Modal, ModalHeader, ModalBody, ModalOverlay , ModalContent, ModalCloseButton} from "@chakra-ui/react";


const ModaContainer =({children, title,  isOpen, onClose}: any) => {
    return (
        <>
        
            <Modal isOpen={isOpen} onClose={onClose} size={['xs' , 'lg']}>
               
                    <ModalOverlay/>
                    
                    <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton/>

                       <ModalBody>
                         {children}
                       </ModalBody>

                    </ModalContent>
              
            </Modal>
        
        </>
    )
}

export default ModaContainer;
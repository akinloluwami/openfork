import { Modal, ModalBody, ModalHeader, ModalCloseButton, ModalContent} from "@chakra-ui/react";


interface Props {
    children ?: any ,
    title ?: string,
    isOpen ?: any,
    onClose ?: any 
}
const ModalContainer =({children, isOpen, onClose , title }: Props) => {
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalCloseButton/>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>

                        {children}
                    </ModalBody>

                </ModalContent>



            </Modal>
        
        </>
    )
}

export default ModalContainer;
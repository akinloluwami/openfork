import { Container } from "@chakra-ui/react";

interface Props {
    children: string ,
    width?: string 
}

const ContainerLayout =({children , width} : Props) => {
    return (
        <>

          <Container maxW={['100%' , '80%']}>
            { children } 
          </Container>
           
        </>
    )
}

export default ContainerLayout;
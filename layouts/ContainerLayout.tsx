import { Container } from "@chakra-ui/react";

interface Props {
  children?: any;
  width?: [];
}

const ContainerLayout = ({ children, width }: Props) => {
  return (
    <>
      <Container maxW={["100%", "90%"]}>{children}</Container>
    </>
  );
};

export default ContainerLayout;

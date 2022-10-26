import { Button, Flex, Text } from "@chakra-ui/react";

interface Props {
  text: string;
  outlined?: boolean;
}

const GradientButton = ({ text, outlined }: Props) => {
  return (
    <Button
      bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
      fontSize="13px"
      p={0.5}
      w={150}
    >
      <Flex
        align={"center"}
        justify={"center"}
        bg={outlined ? "#000" : "transparent"}
        w={"100%"}
        h={"100%"}
        p={0.5}
        borderRadius={"5px"}
      >
        <Text>{text}</Text>
      </Flex>
    </Button>
  );
};

export default GradientButton;

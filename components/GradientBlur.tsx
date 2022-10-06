import { Box } from "@chakra-ui/react";
import { gradient } from "../styles/gradient";
const GradientBlur = ({
  top,
  left = "-10%",
}: {
  top?: string;
  left?: string;
}) => {
  return (
    <Box
      h="250px"
      w="250px"
      top={top}
      left={left}
      borderRadius="50%"
      filter="blur(50px)"
      position={"absolute"}
      style={{
        background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
      }}
    ></Box>
  );
};
export default GradientBlur;

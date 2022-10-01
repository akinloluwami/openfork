import { Text, TextProps } from "@chakra-ui/react";

interface TagProps extends TextProps {
  active?: boolean;
}

const Tag = (props: TagProps) => {
  return (
    <Text
      border="1px solid #222"
      p="6px 12px"
      borderRadius="20px"
      fontSize="12px"
      cursor="pointer"
      userSelect="none"
      bg={`${props.active && "darkorange !important"}`}
      display="block"
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default Tag;

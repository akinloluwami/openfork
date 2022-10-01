import { Box, Image } from "@chakra-ui/react";

interface AvatarProps {
  src: string;
  size?: number;
}
const Avatar = ({ src, size = 150 }: AvatarProps) => {
  return (
    <Box>
      <Image
        src={src}
        objectFit="cover"
        width={size + "px"}
        height={size + "px"}
        borderRadius="50%"
      />
    </Box>
  );
};

export default Avatar;

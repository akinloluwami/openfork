import type { NextPage } from "next";
import { Flex, Box, Heading, Text, Link, Avatar } from "@chakra-ui/react";
import StackTag from "./Tag";
import {
  SiChakraui,
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

interface Props {
  name ?: string ,
  owner ?: string ,
  description ?: string ,
  imgSrc ?: any

};

const ProjectCard: NextPage = ({ name , owner , description, imgSrc}: Props) => {
  return (
   
    <>

      
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        p={0.5}
        w=""
        bg={"transparent"}
        cursor="pointer"
        borderRadius={"md"}
        _hover={{
          background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
        }}
    >
      <Box p={6} w="" bg="#111" borderRadius={"md"}>
        <Flex align="center" gap="10px">
          <Avatar size={['md']} src={imgSrc}/>
          <Heading as="h3" fontSize="30px">
            
            <Text fontSize={'0.7em'}>{name}</Text>

            <Text fontSize="14px" fontWeight="thin" py={2}>
              {owner}
            </Text>
          </Heading>
        </Flex>
        <Text m="15px 0" fontSize="15px">
          {" "}
          {description}
        </Text>
        {/*  */}
        <Flex gap="10px" m="10px 0" align="center">
          <StackTag stackName={"Chakra UI"} icon={SiChakraui} />
          <StackTag stackName={"Supabase"} icon={SiSupabase} />
          <StackTag stackName={"NextJS"} icon={SiNextdotjs} />
          <StackTag stackName={"TypeScript"} icon={SiTypescript} />
        </Flex>
      </Box>
    </Flex>
      
    
    </>

  );
};

export default ProjectCard;

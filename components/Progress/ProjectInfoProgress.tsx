import { Skeleton, Flex, Box } from "@chakra-ui/react";

const ProjectInfoProgress = ()=>{
return <Box>
    
    <Skeleton h="10" rounded="lg" w="50%" />
    <Box my={8}>
    <Skeleton h="4" my={3} rounded="md" w="85%" />
    <Skeleton h="4" my={3} rounded="md" w="85%" />
    <Skeleton h="4" my={3} rounded="md" w="70%" />
    </Box>
    <Flex gap="4"> 
    <Skeleton w="100px" h="30px" rounded="md" />
    <Skeleton w="100px" h="30px" rounded="md" />
    <Skeleton w="100px" h="30px" rounded="md" />
    </Flex>
   
    <Skeleton w="full" h="300px" rounded="md" my={8} />
    
     <Flex gap={5}>
    <Skeleton h="20px" w="100px" rounded="md" />
    <Skeleton h="20px" w="100px" rounded="md" />
    </Flex>
     <Flex gap={25} my={4}>
    <Skeleton h="50px" w="50px" rounded="md" />
    <Skeleton h="50px" w="50px" rounded="md" />
    <Skeleton h="50px" w="50px" rounded="md" />
    </Flex>
</Box>
};
export default ProjectInfoProgress
import {
    Flex,
    Box,
    Grid,
    VStack,
    Skeleton,
  } from "@chakra-ui/react";
const ProjectProgress = ()=>{
return(
     <Grid
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
          my={6}
        >
  {
        Array.from(Array(4)).map((_,i)=>(
        <Flex alignItems={"center"} key={i}
        justifyContent={"center"}
        p={1}
        maxW={["90vw", "400px"]}
        bg={"transparent"}
        
        borderRadius={"md"}
        _hover={{
        //   background: "linear-gradient(to left, #805ad5 0%, #d53f8c 100%)",
        }} w={"full"}>
            <VStack p={5} bg="#111" borderRadius={"md"} align={"flex-start"} w={"full"}>
              <Box
                w={"40%"}
                fontWeight={"500"}
                fontSize={"16px"}
                lineHeight={"20px"}
                color={"#000000"}
              >
                <Skeleton w={"full"} h={"4"} />
              </Box>
              <Box
                w={"30%"}
                fontWeight={"400"}
                fontSize={"12px"}
                lineHeight={"16px"}
                color={"#000000"}
              >
                <Skeleton w={"full"} h={"4"} />
              </Box>
              <Box
                w={"full"}
                fontWeight={"400"}
                fontSize={"12px"}
                lineHeight={"16px"}
                color={"#000000"}
              >
                <Skeleton 
                 my="10px" w={"full"} h={"4"} />
              </Box>
              <Flex gap="10px">
                  {
                      Array.from(Array(3).keys()).map((_, i)=>(
                        <Box key={i}
                        w={"50px"}
                        fontWeight={"400"}
                        fontSize={"12px"}
                        lineHeight={"16px"}
                        color={"#000000"}
                      >
                        <Skeleton w={"full"} h={"4"} />
                      </Box>
                      ))
                  }
              </Flex>
               <Box
                w={"40px"}
                fontWeight={"400"}
                fontSize={"12px"}
                lineHeight={"16px"}
                color={"#000000"}
              >
                <Skeleton  w={"full"} h={"40px"} />
              </Box>
            </VStack>
        </Flex>
      ))
  }
        </Grid>

  )
};
export default ProjectProgress
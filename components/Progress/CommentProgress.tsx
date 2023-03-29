import { Skeleton, Flex, Box } from "@chakra-ui/react";


const CommnetProgress = ()=>{
return (
  <Box my={10}>
<Skeleton h="7" w="35%" my={2} rounded="md" />
<Skeleton h="1" w="full" my={4} rounded="md" />

{
  Array.from(Array(5).keys()).map((_,i)=>(
    <Box key={i}>
   
    <Flex gap="10px" my={4}>
         <Skeleton h="50px" w="50px"  rounded="md" />
         <Box>
             <Skeleton w="250px" my="2" h={3} />
             <Skeleton w="200px" my="2" h={3} />
         </Box>
     </Flex>
     <Skeleton w="full" h="10" rounded="full" />
    </Box>
  ))
}

</Box>
)

};
export default CommnetProgress
import { Skeleton, Flex, Box } from "@chakra-ui/react";

const ProjectAsideProgress = () => {
  return (
    <Box>
      {/*  */}
      <Box
        position="sticky"
        className="sidebar"
        top={2}
        right={0}
        mx="20px"
        border="1px solid #1A202C"
        rounded="md"
        p={8}
      >
        <Skeleton w="200px" h="4" rounded="full" />

        <Skeleton w="full" my={5} h="1" />
        {/* // co */}
        {Array.from(Array(3).keys()).map((_, i) => (
          <Flex my={8} key={i}>
            <Skeleton w="50px" h="50px" rounded="full" />
            <Box mx="10px">
              <Skeleton w="150px" h="2" rounded="lg" my={2} />
              <Skeleton w="150px" h="2" rounded="lg" my={2} />
              <Skeleton w="100px" h="2" rounded="lg" my={2} />
            </Box>
          </Flex>
        ))}
        {/* // con */}

        <Skeleton w="full" my={5} h="1" />

        <Skeleton w="200px" h="4" rounded="full" />
      </Box>
      {/*  */}
    </Box>
  );
};
export default ProjectAsideProgress;

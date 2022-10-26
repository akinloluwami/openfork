import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Header from "../../components/Header";
import ContainerLayout from "../../Layout/ContainerLayout";
import { useState } from "react";
import GradientButton from "../../components/GradientButton";
import { CloseIcon } from "@chakra-ui/icons";

interface LinkProps {
  id: number;
  title: string;
  url: string;
}

const EditProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState<any>([]);

  const addNewLink = () => {
    setLinks([
      ...links,
      {
        id: links.length + 1,
        title: "",
        url: "",
      },
    ]);
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter((link: LinkProps) => link.id !== id));
  };

  return (
    <ContainerLayout>
      <Head>
        <title>Edit Profile | Openfork</title>
      </Head>
      <Header />
      <Flex w={"90%"} m={"auto"} justifyContent={"space-evenly"} my={10}>
        <Box w={"60%"}>
          <Text fontSize={"4xl"} fontWeight={"medium"}>
            My Details
          </Text>
          <Box my={5}>
            <Text>Name</Text>
            <Input
              placeholder={"What's your name?"}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
            />
            {!displayName && (
              <Text fontSize={"sm"} color={"red.500"}>
                Name is required.
              </Text>
            )}
          </Box>

          <Box my={5}>
            <Text>Headline</Text>
            <Input placeholder={"A tagline explaining yourself."} />
          </Box>

          <Box my={5}>
            <Text>Bio</Text>
            <Textarea
              placeholder={"Describe yourself to the open-source community."}
              onChange={(e) => setBio(e.target.value)}
              maxLength={240}
              height={"120px"}
            />
            <Text>{bio.length}/240 characters.</Text>
          </Box>

          <Box>
            <Text fontSize={"4xl"} fontWeight={"medium"}>
              Links
            </Text>
            <Box>
              {links.map((link: LinkProps) => (
                <Flex key={link.id} align={"center"} my={5} gap={3}>
                  <Input placeholder="Link title" />
                  <Input placeholder="Link URL" />
                  <CloseButton
                    title="Delete link"
                    onClick={() => {
                      deleteLink(link.id);
                    }}
                  />
                </Flex>
              ))}
            </Box>
            <Button size={"sm"} onClick={addNewLink}>
              Add link
            </Button>
          </Box>
          <Box my={10}>
            <GradientButton text="Save changes" />
          </Box>
        </Box>
        <Flex direction={"column"} align={"center"} gap={4}>
          <Avatar size={"xl"} />
          <GradientButton text="Change avatar" />
        </Flex>
      </Flex>
    </ContainerLayout>
  );
};

export default EditProfile;

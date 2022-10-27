import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import ContainerLayout from "../../Layout/ContainerLayout";
import { useState } from "react";
import GradientButton from "../../components/GradientButton";
import { supabase } from "../../utils/supabaseClient";

interface LinkProps {
  id: number;
  title: string;
  url: string;
}

const EditProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState<any>([]);
  const [userId, setUserId] = useState("");
  const [headline, setHeadline] = useState("");
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  const fetchUserInfo = async () => {
    const user: any = (await supabase.auth.getUser()).data.user;
    setUserId(user.id);
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    if (profiles) {
      const userData = profiles[0];
      setDisplayName(userData.display_name);
      userData.links === null ? setLinks([]) : setLinks(userData.links);
      userData.bio === null ? setBio("") : setBio(userData.bio);
      userData.headline === null
        ? setHeadline("")
        : setHeadline(userData.headline);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  function generateId() {
    return Math.random().toString(36).substring(2);
  }

  const addNewLink = () => {
    setLinks([
      ...links,
      {
        id: generateId(),
        title: "",
        url: "",
      },
    ]);
  };

  const deleteLink = (id: number) => {
    setLinks(links.filter((link: LinkProps) => link.id !== id));
  };

  const inputTitle = (id: number, title: string) => {
    const newLinks = links.map((link: LinkProps) => {
      if (link.id === id) {
        return {
          ...link,
          title: title,
        };
      }
      return link;
    });
    setLinks(newLinks);
  };

  const inputUrl = (id: number, url: string) => {
    const newLinks = links.map((link: LinkProps) => {
      if (link.id === id) {
        return {
          ...link,
          url: url,
        };
      }
      return link;
    });
    setLinks(newLinks);
  };

  const runProfileUpdate = async () => {
    const updateInfo = {
      display_name: displayName,
      bio,
      headline,
      links,
    };
    const { data, error } = await supabase
      .from("profiles")
      .update(updateInfo)
      .eq("id", userId);
  };

  const updateProfile = () => {
    setUpdating(true);
    const emptyLinksData = links.filter(
      (link: LinkProps) => !link.title || !link.url
    );
    if (emptyLinksData.length > 0) {
      toast({
        title: "Fill in all link info",
        duration: 4000,
        isClosable: true,
        status: "error",
      });
    } else if (!displayName) {
      toast({
        title: "Name cannot be empty",
        duration: 4000,
        isClosable: true,
        status: "error",
      });
    } else {
      runProfileUpdate();
    }
    setUpdating(false);
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
              value={displayName}
            />
            {!displayName && (
              <Text fontSize={"sm"} color={"red.500"}>
                Name is required.
              </Text>
            )}
          </Box>

          <Box my={5}>
            <Text>Headline</Text>
            <Input
              placeholder={"A tagline explaining yourself."}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </Box>

          <Box my={5}>
            <Text>Bio</Text>
            <Textarea
              placeholder={"Describe yourself to the open-source community."}
              onChange={(e) => setBio(e.target.value)}
              maxLength={240}
              height={"120px"}
              value={bio}
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
                  <Input
                    placeholder="Link title"
                    value={link.title}
                    onChange={(e) => {
                      inputTitle(link.id, e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Link URL"
                    value={link.url}
                    onChange={(e) => {
                      inputUrl(link.id, e.target.value);
                    }}
                  />
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
          <Box my={10} onClick={updateProfile}>
            <GradientButton
              text={updating ? "Saving changes..." : "Save changes"}
            />
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

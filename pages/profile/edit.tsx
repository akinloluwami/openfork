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
import ContainerLayout from "../../layouts/ContainerLayout";
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
  const [newProfileImage, setNewProfileImage] = useState({});

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
    setUpdating(true);

    const { data, error } = await supabase
      .from("profiles")
      .update(updateInfo)
      .eq("id", userId);
    setUpdating(false);
    toast({
      title: "Profile updated successfully",
      duration: 4000,
      isClosable: true,
      status: "success",
    });
  };

  const updateProfile = () => {
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
  };

  // const updateDP = async () => {
  //   const { data, error } = await supabase.storage
  //     .from("avatars")
  //     .upload(
  //       `public/${userId}-${new Date().getTime().toString()}`,
  //       newProfileImage
  //     );
  //   if (data) {
  //     const path: any = data?.path;
  //     const url: string = `https:tebioleiibrvzamyqsia.supabase.co/storage/v1/object/sign/avatars/${path}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzLzM2NDk2YTk0LTlkOTMtNGEwYy1hN2UyLTRjMzQ4MWY3ZDQ3Yy0xNjY2ODMzNjUwODk3IiwiaWF0IjoxNjY2ODMzNzAzLCJleHAiOjE5ODIxOTM3MDN9.qPtcYuLB-Ipcde_a9nNoYpgkl6ivpK0MgZRm_Aw3JPA`;

  //     /*

  //     https://tebioleiibrvzamyqsia.supabase.co/storage/v1/object/sign/avatars/public/36496a94-9d93-4a0c-a7e2-4c3481f7d47c-1666835737376?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy8zNjQ5NmE5NC05ZDkzLTRhMGMtYTdlMi00YzM0ODFmN2Q0N2MtMTY2NjgzNTczNzM3NiIsImlhdCI6MTY2NjgzNjAwNCwiZXhwIjoxOTgyMTk2MDA0fQ.EOSKuob_BzlZeK4KEcH53Tq-YRbgM-KXMexhHBU5HEA*/
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .update({ avatar_url: url })
  //       .eq("id", userId);
  //     if (data) {
  //       console.log("====================================");
  //       console.log(data);
  //       console.log("====================================");
  //     } else {
  //       console.log("====================================");
  //       console.log(error);
  //       console.log("====================================");
  //     }
  //   }
  // };

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
            <Button disabled={updating}>
              {updating ? (
                <Flex gap={3}>
                  Saving changes... <Spinner size={"sm"} />{" "}
                </Flex>
              ) : (
                "Save changes"
              )}
            </Button>
          </Box>
        </Box>
        {/* <Flex direction={"column"} align={"center"} gap={4}>
          <Avatar size={"xl"} />
          <Box>
            <GradientButton text="Change avatar" />
          </Box>
          <Input
            type={"file"}
            onChange={async (e: any) => {
              const avatarFile = e.target.files[0];
              setNewProfileImage(avatarFile);
            }}
          />
        </Flex> */}
      </Flex>
    </ContainerLayout>
  );
};

export default EditProfile;

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const AddNewProject = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projectName, setProjectName] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const addNewProject = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const { data, error } = await supabase.from("Projects").insert([
      {
        user: JSON.parse(
          localStorage.getItem("sb-tebioleiibrvzamyqsia-auth-token")
        ).user.id,
        name: projectName,
        github_url: githubURL,
      },
    ]);
    setIsLoading(false);
    if (error) {
      if (error.message.includes("github_url_key")) {
        setErrorMessage("A project with this GitHub URL already exist");
      }
    } else {
      setSuccessMessage("Project has been added successfully");
    }
  };

  return (
    <>
      <Button
        ml={20}
        bg="linear-gradient(to left, #805ad5 0%, #d53f8c 100%)"
        fontSize="13px"
        p={0.5}
        w={150}
        onClick={onOpen}
      >
        Add New Project
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && <Text color={"red.400"}>{errorMessage}</Text>}
            {successMessage && (
              <Text color={"green.400"}>{successMessage}</Text>
            )}
            <Input
              placeholder={"Project name"}
              my={2}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
            <Input
              placeholder={"GitHub URL"}
              my={2}
              onChange={(e) => {
                setGithubURL(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={addNewProject}
              disabled={!projectName || !githubURL || isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewProject;

import { Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import ContainerLayout from "../Layout/ContainerLayout";
import ProjectCard from "./ProjectCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Head from "next/head";

const Projects = () => {
  const demo = [
    {
      name: "Open Fork",
      owner: "@bossoncode",
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `,
    },
    {
      name: "Fork",
      owner: "@bossoncode",
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `,
    },
    {
      name: "Open",
      owner: "@bossoncode",
      description: `Find Open-Source You can contribute to. 
      dolorem inventore alias assumenda quisquam qui repellat eaque illo architecto dolor iur

      `,
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initPageTitle =
    "Openfork - Open-source projects you can actually contribute to.";
  const [pageTitle, setPageTitle] = useState(initPageTitle);

  const cardCLick = (title: string) => {
    onOpen();
    setPageTitle(`${title} - Openfork`);
  };
  const cardClose = () => {
    setPageTitle(initPageTitle);
  };

  return (
    <ContainerLayout>
      <>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
                vitae tenetur laudantium pariatur asperiores distinctio, magni
                est numquam tempore ullam nisi error, cupiditate autem dolore?
                Tenetur commodi enim veritatis odio, doloribus soluta
                reprehenderit optio repellendus inventore cum omnis eius
                recusandae.
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  onClose();
                  cardClose();
                }}
              >
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Grid
          mt={20}
          alignItems={"center"}
          w="100%"
          templateColumns={"repeat(auto-fit, minmax(350px, 1fr))"}
          justifyContent={"center"}
          gap={5}
          py={10}
        >
          {demo.map((items, index) => (
            <ProjectCard
              //  @ts-ignore
              name={items.name}
              owner={items.owner}
              description={items.description}
              key={index}
              onOpen={() => {
                cardCLick(items.name);
              }}
            />
          ))}
        </Grid>
      </>
    </ContainerLayout>
  );
};

export default Projects;

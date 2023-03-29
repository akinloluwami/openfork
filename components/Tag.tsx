import { NextPage } from "next";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

interface TagProps {
  stackName: string;
  icon?: any;
}

const StackTag: NextPage<TagProps> = (props) => {
  const { stackName, icon } = props;
  return (
    <Tag size={"md"} variant="outline">
      {icon && <TagLeftIcon boxSize="12px" as={icon} />}
      <TagLabel fontSize="10px">{stackName}</TagLabel>
    </Tag>
  );
};

export default StackTag;

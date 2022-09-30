// import type { NextPage } from "next";
// import { Button as Btn } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';

// const Button: NextPage = () => {
//   return <Btn></Btn>;
// };

// export default Button;
interface Props {
  children ?: any,
  bg ?: string,
  color ?: string
}

const Buttons =({ children , bg, color }: Props) => {
  return (
    <>

      <Button bg={bg} color={color}>
          {children}
      </Button>
    
    </>
  )
}


export default Buttons

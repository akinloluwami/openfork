import { Button, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  loading?:boolean
}

const Buttons =(props: Props) => {
  return (
    <>

      <Button {...props}>
          {props.children}
      </Button>
    
    </>
  )
}


export default Buttons

import { Button as ChakraButton } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = (props: any) => {
  return (
    <ChakraButton
      variant={"solid"}
      colorScheme="#31CF41"
      {...props}
      className={`text-white font-bold bg-[#31CF41] !px-[60px] !h-[56px] py-[15px] rounded-[6px] ${props.className}`}
    >
      {props.children}
    </ChakraButton>
  );
};

export default Button;

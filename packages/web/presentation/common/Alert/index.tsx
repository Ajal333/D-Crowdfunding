import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface Props {
  status: "info" | "warning" | "success" | "error";
  className: string;
  text: string;
}

const CustomAlert = ({ status, className, text }: Props) => {
  return (
    <Alert status={status} className={className}>
      <AlertIcon />
      <AlertTitle mr={2}>{text}</AlertTitle>
    </Alert>
  );
};

export default CustomAlert;

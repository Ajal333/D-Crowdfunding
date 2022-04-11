import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const Card = () => {
  return (
    <Stack className="!z-[-1]">
      <Skeleton height={200} />
      <SkeletonText noOfLines={3} spacing={2} className="!mt-[20px]" />
      <Skeleton height="10" width={150} className="!mt-[20px]" />
    </Stack>
  );
};

export default Card;

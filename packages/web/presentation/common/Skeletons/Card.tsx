import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const Card = () => {
  return (
    <Stack className="!z-[-1] bg-white border border-[#BEBEBE] rounded-[6px]">
      <Skeleton height={200} className="!rounded-t-[5px]" />
      <div className="p-[30px]">
        <SkeletonText noOfLines={3} spacing={2} />
        <Skeleton height="10" width={150} className="!mt-[20px]" />
      </div>
    </Stack>
  );
};

export default Card;

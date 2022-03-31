import CampaignCard from "@presentation/common/CampaignCard";
import { H2 } from "@presentation/common/Typography";
import HeadMeta from "@presentation/common/HeadMeta";
import Layout from "@presentation/Layout";
import { usePosts } from "infrastructure";

const Campaigns = () => {
  const { data, isLoading, isFetching } = usePosts(10);

  console.log("data :>> ", data);
  console.log("isLoading :>> ", isLoading);
  console.log("isFetching :>> ", isFetching);

  return (
    <Layout>
      <HeadMeta
        title="Campaigns | D-Crowdfunding"
        description="List of active campaigns"
        image=""
        keywords=""
        url=""
      />
      <H2 className="mt-[50px] mb-[40px]">Campaigns</H2>
      <div className="grid grid-cols-3 gap-[45px]">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <CampaignCard
              title="Lorem Ipsum Dolor Campaign"
              description="lorem ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum dolor dolor lorem dolor ipsum"
              key={idx}
            />
          ))}
      </div>
    </Layout>
  );
};

export default Campaigns;

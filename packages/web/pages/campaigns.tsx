import CampaignCard from "@presentation/common/CampaignCard";
import H2 from "@presentation/common/H2";
import Layout from "@presentation/Layout";

const Campaigns = () => {
  return (
    <Layout>
      <title>D-Crowdfunding | Campaigns</title>
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

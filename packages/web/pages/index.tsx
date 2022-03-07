import type { NextPage } from "next";
import Layout from "@presentation/Layout";
import Button from "@presentation/common/Button";
import H1 from "@presentation/common/H1";
import H2 from "@presentation/common/H2";
import CampaignCard from "@presentation/common/CampaignCard";

const Home: NextPage = () => {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/BG.svg"
        alt=""
        className="absolute top-0 w-full h-full object-cover z-[-1]"
      />
      <Layout>
        <div className="min-h-[90vh] flex flex-col items-center justify-center">
          <H1>Know how your donations are spent</H1>
          <Button className="mt-[50px]">View Campaigns</Button>
        </div>
        <section className="flex flex-col">
          <H2 className="mb-[50px]">Latest Campaign</H2>
          <div className="grid grid-cols-3 gap-[45px]">
            {Array(3)
              .fill(null)
              .map((_, idx) => (
                <CampaignCard
                  title="Lorem Ipsum Dolor Campaign"
                  description="lorem ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum dolor dolor lorem dolor ipsum"
                  key={idx}
                />
              ))}
          </div>
          <div className="flex items-center justify-center mt-[45px]">
            <Button>View all campaigns</Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;

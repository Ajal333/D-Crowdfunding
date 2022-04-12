import HeadMeta from "@presentation/common/HeadMeta";
import HelpCard from "@presentation/common/HelpCard";
import { H2 } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

const Work = () => {
  const Works = [
    {
      title: "Create a Campaign for Fundraising",
      description:
        "It'll take only 2 minutes. Just enter a few details about the funds you are raising for.",
    },
    {
      title: "Share your Campaign",
      description:
        "All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in.",
    },
    {
      title: "Request and Withdraw Funds",
      description:
        "The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request.",
    },
  ];

  return (
    <Layout>
      <HeadMeta
        title="D-Crowdfunding | Know how your donations are spent"
        description="D-Crowdfuncding is a decentralised platform for crowdfunding"
        image=""
        keywords=""
        url=""
      />
      <H2 className="mt-[50px] mb-[40px]">How it works?</H2>
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-[45px]">
        {Works?.map(({ title, description }, idx) => (
          <HelpCard title={title} description={description} key={idx} />
        ))}
      </div>
    </Layout>
  );
};

export default Work;

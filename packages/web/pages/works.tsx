import HeadMeta from "@presentation/common/HeadMeta";
import HelpCard from "@presentation/common/HelpCard";
import { H2 } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

const Work = () => {
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
      <div className="grid grid-cols-3 gap-[45px]">
        {Array(3)
          .fill(null)
          .map((_, idx) => (
            <HelpCard
              title="Create a Campaign for Fundraising"
              description="It'll take only 2 minutes. Just enter a few details about the funds you are raising for."
              key={idx}
            />
          ))}
      </div>
    </Layout>
  );
};

export default Work;

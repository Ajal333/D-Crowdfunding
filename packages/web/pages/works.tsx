import HelpCard from "@presentation/common/HelpCard";
import Layout from "@presentation/Layout";
import H2 from "@presentation/common/Typography/H2";

const Work = () => {
  return (
    <Layout>
      <title>D-Crowdfunding | How it works</title>
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

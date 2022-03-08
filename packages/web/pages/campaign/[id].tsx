import Button from "@presentation/common/Button";

import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import { H2, H3, H5, P } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

const Campaign = () => {
  return (
    <Layout>
      <HeadMeta
        title="Campaign | D-Crowdfunding"
        description="Campaign page"
        image=""
        keywords=""
        url=""
      />
      <main className=" min-h-[50vh] my-10 ">
        <H2>Camapaign Name</H2>
        <div className="flex my-10">
          <P>
            lorem ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum
            dolor dolor lorem dolor ipsumlorem ipsum lorem ipsum dolor dolor
            lorem dolor ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem
            ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum dolor
            dolor lorem dolor ipsum lorem ipsum. lorem ipsum dolor dolor lorem
            dolor ipsum lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum
            lorem ipsum dolor dolor lorem dolor ipsum lorem ipsum dolor dolor
            lorem dolor ipsum lorem.
          </P>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1607703703674-df96af81dffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGFpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="campaign"
            className=" w-2/5 h-[160px]  object-cover object-center"
          />
        </div>
        <div className=" my-10">
          <H3>Payment for the campaign</H3>
          <div className="flex my-6">
            <Input type="text" placeholder="Enter the donation amount" />
            <Button className="mx-5">Make donation</Button>
          </div>
          <H5 className=" font-medium text-black">*Min-amount is 0.01 Eth</H5>
        </div>
      </main>
    </Layout>
  );
};

export default Campaign;

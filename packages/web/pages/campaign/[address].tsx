import Button from "@presentation/common/Button";

import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import { H2, H3, H5, P } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CrowdFunding from "@infrastructure/crowdfunding";
import web3 from "@infrastructure/web3";

import { CampaignType } from "types";

const Campaign = () => {
  const [campaignData, setCampaignData] = useState<CampaignType>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const campaign = await CrowdFunding(router?.query?.address as string)
        .methods.getSummary()
        .call();

      const campaignData: CampaignType = {
        minimumContribution: parseFloat(
          web3.utils.fromWei(campaign[0], "ether")
        ),
        numberOfRequests: parseInt(campaign[1]),
        targetAmount: parseFloat(web3.utils.fromWei(campaign[2], "ether")),
        totalDonated: parseFloat(web3.utils.fromWei(campaign[3], "ether")),
        deadline: campaign[4],
        organizationAddress: campaign[5],
        name: campaign[6],
        description: campaign[7],
        image: campaign[8],
        address: router.query.address as string,
      };

      setCampaignData(campaignData);
    })();
    console.log(router.query.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <HeadMeta
        title="Campaign | D-Crowdfunding"
        description="Campaign page"
        image=""
        keywords=""
        url=""
      />
      <main className="min-h-[50vh] my-10 ">
        <H2>{campaignData?.name}</H2>
        <div className="flex">
          <div className="flex flex-col my-10">
            <P>{campaignData?.description}</P>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className=" my-10">
              <H3>Payment for the campaign</H3>
              <div className="flex my-6">
                <Input type="text" placeholder="Enter the donation amount" />
                <Button className="mx-5">Make donation</Button>
              </div>
              <H5 className=" font-medium text-black">
                *Min-amount is ${campaignData?.minimumContribution} CELO
              </H5>
            </div>
          </div>
          <img
            src={campaignData?.image}
            alt={`Image of campaign - ${campaignData?.name}`}
            className="rounded-[6px] w-2/5  object-cover object-center"
          />
        </div>
      </main>
    </Layout>
  );
};

export default Campaign;

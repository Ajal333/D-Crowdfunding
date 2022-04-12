import type { NextPage } from "next";
import Layout from "@presentation/Layout";
import Button from "@presentation/common/Button";
import CampaignCard from "@presentation/common/CampaignCard";
import Link from "next/link";
import { H1, H2 } from "@presentation/common/Typography";
import HeadMeta from "@presentation/common/HeadMeta";
import campaigns from "@infrastructure/campaigns";
import CrowdFunding from "@infrastructure/crowdfunding";
import { useEffect, useState } from "react";
import web3 from "@infrastructure/web3";

import { CampaignType } from "types";
import { CardSkeleton } from "@presentation/common/Skeletons";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";

const Home: NextPage = () => {
  const [campaignsData, setCampaignsData] = useState<CampaignType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [maticPrice, setMaticPrice] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const campaignAddresses = await campaigns.methods
        .getDeployedCampaigns()
        .call();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const campaignsData: string[] = await Promise.all(
        campaignAddresses.map((_: string, id: number) =>
          CrowdFunding(campaignAddresses[id]).methods.getSummary().call()
        )
      );
      const maticPriceInUSD = await getMaticPrice();
      setMaticPrice(maticPriceInUSD);
      const parsedCampaignsData: CampaignType[] = [];

      campaignsData.forEach((campaign: string, i: number) => {
        parsedCampaignsData.push({
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
          address: campaignAddresses[i],
        });
      });

      setCampaignsData(parsedCampaignsData.slice(0, 3));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <HeadMeta
        title="D-Crowdfunding | Know how your donations are spent"
        description="D-Crowdfuncding is a decentralised platform for crowdfunding"
        image=""
        keywords=""
        url=""
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/BG.svg"
        alt=""
        className="absolute top-0 w-full h-full object-cover z-[-1]"
      />
      <Layout>
        <div className="min-h-[100vh] flex flex-col items-center justify-center">
          <H1>Know how your donations are spent</H1>
          <Link href="/campaigns">
            <a>
              <Button className="mt-[50px]">View Campaigns</Button>
            </a>
          </Link>
        </div>
        <section className="flex flex-col">
          <H2 className="mb-[50px]">Latest Campaign</H2>
          <div className="grid grid-cols-3 gap-[45px]">
            {loading
              ? Array(3)
                  .fill(null)
                  .map((_, i) => <CardSkeleton key={i} />)
              : campaignsData.map((campaign) => (
                  <CampaignCard
                    title={campaign.name}
                    description={campaign.description}
                    address={campaign.address}
                    image={campaign.image}
                    organization={campaign.organizationAddress}
                    raisedAmount={campaign.totalDonated}
                    targetAmount={campaign.targetAmount}
                    maticPrice={maticPrice}
                    key={campaign.address}
                  />
                ))}
          </div>
          <div className="flex items-center justify-center mt-[45px]">
            <Link href="/campaigns">
              <a>
                <Button>View all campaigns</Button>
              </a>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;

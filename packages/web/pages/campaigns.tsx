import CampaignCard from "@presentation/common/CampaignCard";
import { H2 } from "@presentation/common/Typography";
import HeadMeta from "@presentation/common/HeadMeta";
import Layout from "@presentation/Layout";
import { useEffect, useState } from "react";

import campaigns from "@infrastructure/campaigns";
import CrowdFunding from "@infrastructure/crowdfunding";
import { CampaignType } from "types";
import web3 from "@infrastructure/web3";
import { CardSkeleton } from "@presentation/common/Skeletons";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";

const Campaigns = () => {
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

      setCampaignsData(parsedCampaignsData);
      setLoading(false);
    })();
  }, []);

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
        {loading
          ? Array(6)
              .fill(null)
              .map((_, i) => <CardSkeleton key={i} />)
          : campaignsData.map((campaign) => (
              <CampaignCard
                title={campaign.name}
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
    </Layout>
  );
};

export default Campaigns;

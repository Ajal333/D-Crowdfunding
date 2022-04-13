import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AvatarGenerator } from "random-avatar-generator";

import Layout from "@presentation/Layout";
import { H3 } from "@presentation/common/Typography";
import CampaignCard from "@presentation/common/CampaignCard";
import Button from "@presentation/common/Button";
import HeadMeta from "@presentation/common/HeadMeta";

import campaigns from "@infrastructure/campaigns";
import CrowdFunding from "@infrastructure/crowdfunding";
import { CampaignType } from "types";
import web3 from "@infrastructure/web3";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";

interface Props {
  campaigns: CampaignType[];
}

const Prof = ({ campaigns }: Props) => {
  const [userCampaigns, setUserCampaigns] = useState<CampaignType[]>([]);
  const [maticPrice, setMaticPrice] = useState<number | null>(null);
  const [account, setAccount] = useState<string>("");

  const generator = new AvatarGenerator();

  useEffect(() => {
    (async () => {
      const maticPriceInUSD = await getMaticPrice();
      setMaticPrice(maticPriceInUSD);
      const account = (await web3.eth.getAccounts())[0];
      setAccount(account);
      const parsedCampaigns: CampaignType[] = [];
      if (account) {
        campaigns.forEach((campaign) => {
          if (campaign.organizationAddress === account) {
            parsedCampaigns.push(campaign);
          }
        });
      }
      setUserCampaigns(parsedCampaigns);
    })();
  }, []);

  return (
    <Layout>
      <HeadMeta
        title={`${account} | D-Crowdfunding`}
        description={`Profile page of ${account}`}
        image=""
        keywords=""
        url={`https://d-crowdfunding.vercel.app/user/${account}`}
      />
      <section className="flex flex-col object-center mt-[60px]">
        <img
          src={generator.generateRandomAvatar(account)}
          alt=""
          className="h-[192px] w-[192px] mx-auto"
        />
        <div className="flex flex-col mt-[10px] justify-center items-center gap-[10px]">
          <div className="flex gap-[5px]">
            <h2 className="font-bold text-lg">John Doe</h2>
            <img src="/octicon_verified-16.svg" alt="" />
          </div>
          <p>johndoe@hellothere.com</p>
          <div className="grid grid-cols-2 gap-[45px] mt-[10px]">
            <div className="flex flex-col shadow-lg justify-center items-center p-4">
              <p>Successful Campaigns</p>
              <h2 className="font-bold text-3xl">7</h2>
            </div>
            <div className="flex flex-col shadow-lg justify-center items-center p-4">
              <p>Donations Made</p>
              <h2 className="font-bold text-3xl">$242</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col">
        <H3 className="font-bold mt-[50px] mb-[50px]">Created Campaigns</H3>
        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-[45px]">
          {userCampaigns.map((campaign) => (
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
        <div className="flex items-center justify-center mt-[45px]">
          <Link href="/campaigns">
            <a>
              <Button>View all campaigns</Button>
            </a>
          </Link>
        </div>
      </section>
      <section className="flex flex-col">
        <H3 className="font-bold mt-[50px] mb-[50px]">Donated Campaigns</H3>
        <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-[45px]">
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
          <Link href="/campaigns">
            <a>
              <Button>View all campaigns</Button>
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Prof;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const campaigns = await fetchData();
    return {
      props: {
        campaigns,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        campaigns: [],
      },
    };
  }
};

const fetchData = async (): Promise<CampaignType[]> => {
  try {
    const campaignAddresses = await campaigns.methods
      .getDeployedCampaigns()
      .call();
    const campaignsData: string[] = await Promise.all(
      campaignAddresses.map((_: string, id: number) =>
        CrowdFunding(campaignAddresses[id]).methods.getSummary().call()
      )
    );

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
    return parsedCampaignsData;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
};

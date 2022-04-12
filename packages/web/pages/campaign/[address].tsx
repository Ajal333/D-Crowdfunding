import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Button from "@presentation/common/Button";
import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import { H2, H3, H5, P } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

import CrowdFunding from "@infrastructure/crowdfunding";
import web3 from "@infrastructure/web3";

import { CampaignType } from "types";
import { useRouter } from "next/router";

interface Props {
  campaignData: CampaignType | null;
}

const Campaign: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  campaignData,
}: Props) => {
  const router = useRouter();

  return (
    <Layout>
      <HeadMeta
        title={`${campaignData?.name ?? "Campaign"} | D-Crowdfunding`}
        description={campaignData.description ?? "Campaign page"}
        image={campaignData.image}
        keywords=""
        url={`https://d-crowdfunding.vercel.app${router.asPath}`}
      />
      <main className="min-h-[50vh] my-10 ">
        <H2>{campaignData?.name}</H2>
        <div className="flex flex-col-reverse md:flex-row mt-10">
          <div className="flex flex-col mb-10">
            <H5 className="font-bold">Description</H5>
            <P className="!w-full mb-[20px]">{campaignData?.description}</P>
            <H5 className="font-bold">Campaign expires on</H5>
            <P className="!w-full mb-[20px]">
              {new Date(parseInt(campaignData?.deadline)).toLocaleDateString()}
            </P>
            <H5 className="font-bold">Requests</H5>
            <P className="!w-full mb-[20px]">{campaignData.numberOfRequests}</P>
            <H5 className="font-bold">Organization Address</H5>
            <P className="!w-full mb-[20px]">
              {campaignData.organizationAddress}
            </P>
            <H5 className="font-bold">Contract Address</H5>
            <a
              className="!w-full mb-[20px] text-blue-500 font-bold"
              href={`https://alfajores-blockscout.celo-testnet.org/address/${campaignData.address}/transactions`}
            >
              {campaignData.address}
            </a>
            <H5 className="font-bold">Amount raised</H5>
            <P className="!w-full mb-[20px]">
              {campaignData.totalDonated}/{campaignData.targetAmount} CELO
            </P>
            <div className=" my-10">
              <H3>Payment for the campaign</H3>
              <div className="flex flex-col md:flex-row my-6">
                <Input type="text" placeholder="Enter the donation amount" />
                <Button className="my-5 md:mx-5 md:my-0">Make donation</Button>
              </div>
              <H5 className=" font-medium text-black">
                *Min-amount is {campaignData?.minimumContribution} CELO
              </H5>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <img
              src={campaignData?.image}
              alt={`Image of campaign - ${campaignData?.name}`}
              className="rounded-[6px] mb-5 md:mb-0 object-cover object-center"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Campaign;

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<{ props: { campaignData: CampaignType } }> => {
  try {
    const campaign = await CrowdFunding(query?.address as string)
      .methods.getSummary()
      .call();

    const campaignData: CampaignType = {
      minimumContribution: parseFloat(web3.utils.fromWei(campaign[0], "ether")),
      numberOfRequests: parseInt(campaign[1]),
      targetAmount: parseFloat(web3.utils.fromWei(campaign[2], "ether")),
      totalDonated: parseFloat(web3.utils.fromWei(campaign[3], "ether")),
      deadline: campaign[4],
      organizationAddress: campaign[5],
      name: campaign[6],
      description: campaign[7],
      image: campaign[8],
      address: query.address as string,
    };

    return {
      props: {
        campaignData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        campaignData: null,
      },
    };
  }
};

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
import { useEffect, useState } from "react";

interface Props {
  campaignData: CampaignType | null;
}

const Campaign: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  campaignData,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<CampaignType>(campaignData);
  const [amount, setAmount] = useState<string>(
    campaignData?.minimumContribution?.toString() ?? "0"
  );
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (campaignData === null) {
        setLoading(true);
        const response = await fetchData(router.query?.address as string);
        setData(response);
      }
      setLoading(false);
    })();
  }, []);

  const makeDonation = async () => {
    try {
      const campaign = CrowdFunding(router?.query?.address as string);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.sendEth().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });
    } catch (error) {}
  };

  return (
    <Layout>
      <HeadMeta
        title={`${data?.name ?? "Campaign"} | D-Crowdfunding`}
        description={data?.description ?? "Campaign page"}
        image={data?.image}
        keywords=""
        url={`https://d-crowdfunding.vercel.app${router.asPath}`}
      />
      {loading ? (
        <div>Loading...</div>
      ) : data === null ? (
        <div>
          Campaign with contract address {router?.query?.address} doesn&apos;t
          exist
        </div>
      ) : (
        <main className="min-h-[50vh] my-10 ">
          <H2>{data?.name}</H2>
          <div className="flex mt-10">
            <div className="flex flex-1 flex-col mb-10">
              <H5 className="font-bold">Description</H5>
              <P className="!w-full mb-[20px]">{data?.description}</P>
              <H5 className="font-bold">Campaign expires on</H5>
              <P className="!w-full mb-[20px]">
                {new Date(parseInt(data?.deadline)).toLocaleDateString()}
              </P>
              <H5 className="font-bold">Requests</H5>
              <P className="!w-full mb-[20px]">{data?.numberOfRequests}</P>
              <H5 className="font-bold">Organization Address</H5>
              <P className="!w-full mb-[20px]">{data?.organizationAddress}</P>
              <H5 className="font-bold">Contract Address</H5>
              <a
                className="!w-full mb-[20px] text-blue-500 font-bold"
                href={`https://alfajores-blockscout.celo-testnet.org/address/${campaignData?.address}/transactions`}
              >
                {data?.address}
              </a>
              <H5 className="font-bold">Amount raised</H5>
              <P className="!w-full mb-[20px]">
                <span className="font-bold">
                  {data?.totalDonated}/{data?.targetAmount}
                </span>{" "}
                MATIC
              </P>
              <div className=" my-10">
                <H3>Payment for the campaign</H3>
                <div className="flex items-center my-6">
                  <Input
                    type="number"
                    step={1}
                    placeholder="Enter the donation amount"
                    className="flex-1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button className="ml-2" onClick={makeDonation}>
                    Make donation
                  </Button>
                </div>
                <H5 className=" font-medium text-black">
                  *Min-amount is{" "}
                  <span className="font-bold">
                    {data?.minimumContribution} MATIC
                  </span>
                </H5>
              </div>
            </div>
            <div className="flex flex-1 items-start justify-center w-full">
              <img
                src={data?.image}
                alt={`Image of campaign - ${data?.name}`}
                className="rounded-[6px] object-cover object-center"
              />
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Campaign;

const fetchData = async (address: string): Promise<CampaignType> => {
  try {
    const campaign = await CrowdFunding(address as string)
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
      address: address as string,
    };
    return campaignData;
  } catch (error) {
    console.log("ERROR: ", error);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}): Promise<{ props: { campaignData: CampaignType } }> => {
  const campaignData = await fetchData(query?.address as string);
  return {
    props: {
      campaignData,
    },
  };
};

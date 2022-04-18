import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

import HeadMeta from "@presentation/common/HeadMeta";
import { H2, H3 } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

import CrowdFunding from "@infrastructure/crowdfunding";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";

interface Props {
  campaignId: string;
  requestCount: string;
  balance: string;
  name: string;
  maticPrice: string;
}

interface RequestInterface {
  description: string;
  address: string;
  noOfVoters: string;
  recipient: string;
  value: string;
}

export default function Requests({ campaignId, requestCount }: Props) {
  const [data, setData] = useState<RequestInterface[]>([]);

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRequests = async () => {
    const campaign = CrowdFunding(campaignId);
    try {
      const response: RequestInterface[] = await Promise.all(
        Array(parseInt(requestCount))
          .fill(null)
          .map((_, index) => campaign.methods.requests(index).call())
      );

      setData(response);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <HeadMeta
          title="D-Crowdfunding | Know how your donations are spent"
          description="D-Crowdfuncding is a decentralised platform for crowdfunding"
          image=""
          keywords=""
          url=""
        />
        <H2 className="mt-[50px]">Requests</H2>
        <div className="flex flex-col max-w-[500px] mx-auto mt-[48px]">
          {data?.map((d) => (
            <H3>{d.description}</H3>
          ))}
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  try {
    const campaignId = query?.address;
    const campaign = CrowdFunding(campaignId as string);
    const summary = await campaign.methods.getSummary().call();
    const maticPrice = await getMaticPrice();

    return {
      props: {
        campaignId,
        requestCount: summary[1],
        balance: summary[3],
        name: summary[6],
        maticPrice,
      },
    };
  } catch (error) {}
};

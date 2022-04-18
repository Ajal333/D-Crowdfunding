import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

import HeadMeta from "@presentation/common/HeadMeta";
import { H2, H3 } from "@presentation/common/Typography";
import Button from "@presentation/common/Button";
import Layout from "@presentation/Layout";

import CrowdFunding from "@infrastructure/crowdfunding";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";
import web3 from "@infrastructure/web3";

interface Props {
  campaignId: string;
  requestCount: string;
  balance: string;
  name: string;
  maticPrice: string;
  organisationAddress: string;
}

interface RequestInterface {
  description: string;
  address: string;
  noOfVoters: string;
  recipient: string;
  value: string;
}

export default function Requests({
  campaignId,
  requestCount,
  organisationAddress,
}: Props) {
  const [data, setData] = useState<RequestInterface[]>([]);
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRequests = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const campaign = CrowdFunding(campaignId);
    try {
      const response: RequestInterface[] = await Promise.all(
        Array(parseInt(requestCount))
          .fill(null)
          .map((_, index) => campaign.methods.requests(index).call())
      );
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (requestId: number) => {
    try {
      const campaign = CrowdFunding(campaignId);
      const response = await campaign.methods.voteRequest(requestId).send({
        from: account,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (requestId: number) => {
    try {
      const campaign = CrowdFunding(campaignId);
      const response = await campaign.methods.makePayment(requestId).send({
        from: account,
      });
      console.log(response);
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
          {data?.map((d, i) => (
            <>
              <H3>{d.description}</H3>
              <Button onClick={() => handleVote(i)}>Vote</Button>
              {account === organisationAddress && (
                <Button onClick={() => makePayment(i)}>Pull funds</Button>
              )}
            </>
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
        organisationAddress: summary[5],
        maticPrice,
      },
    };
  } catch (error) {}
};

import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";

import HeadMeta from "@presentation/common/HeadMeta";
import { H2 } from "@presentation/common/Typography";
import Button from "@presentation/common/Button";
import Layout from "@presentation/Layout";

import CrowdFunding from "@infrastructure/crowdfunding";
import { getMaticPrice } from "@infrastructure/getMaticToUSD";
import web3 from "@infrastructure/web3";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

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
  const [voting, setVoting] = useState<boolean>(false);
  const [withdrawing, setWithdrawing] = useState<boolean>(false);

  const toast = useToast();

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
    setVoting(true);
    try {
      const campaign = CrowdFunding(campaignId);
      const response = await campaign.methods.voteRequest(requestId).send({
        from: account,
      });
      console.log(response);
      toast({
        title: "Voting completed.",
        description: `You have sucessfully voted for this campaign.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Voting unsucessful.",
        description: `Voting could not be completed sucessfully.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setVoting(false);
    }
  };

  const makePayment = async (requestId: number) => {
    setWithdrawing(true);
    try {
      const campaign = CrowdFunding(campaignId);
      const response = await campaign.methods.makePayment(requestId).send({
        from: account,
      });
      toast({
        title: "Withdrawal completed.",
        description: `You have sucessfully completed the fund withdrawal.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast({
        title: "Fund Withdrawal unsucessful.",
        description: `Fund withdrawal could not be completed sucessfully.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setWithdrawing(false);
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
        <div className="flex flex-col  mx-auto mt-[48px]">
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Description</Th>
                  <Th>Recipient Address</Th>
                  <Th>Amount</Th>
                  <Th>Voters</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((d, i) => (
                  <Tr>
                    <Td>{d?.description}</Td>
                    <Td>{d?.recipient}</Td>
                    <Td>{d?.value}</Td>
                    <Td>{d?.noOfVoters}</Td>
                    <Td>
                      {account === organisationAddress && (
                        <Button
                          isLoading={withdrawing}
                          loadingText="Pulling funds..."
                          onClick={() => makePayment(i)}
                          className="mr-4"
                          colorScheme="linkedin"
                        >
                          Pull funds
                        </Button>
                      )}
                      <Button
                        isLoading={voting}
                        loadingText="Voting..."
                        size="sm"
                        onClick={() => handleVote(i)}
                      >
                        Vote
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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

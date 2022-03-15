import type { GetServerSideProps, NextPage } from "next";
import Layout from "@presentation/Layout";
import Button from "@presentation/common/Button";
import CampaignCard from "@presentation/common/CampaignCard";
import Link from "next/link";
import { H1, H2 } from "@presentation/common/Typography";
import HeadMeta from "@presentation/common/HeadMeta";
import { dehydrate, QueryClient } from "react-query";
import { getPosts } from "infrastructure";

const Home: NextPage = () => {
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", 10], () => getPosts(10));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;

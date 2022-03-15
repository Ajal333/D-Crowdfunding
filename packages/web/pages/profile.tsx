import Layout from "@presentation/Layout";
import { H3 } from "@presentation/common/Typography";
import CampaignCard from "@presentation/common/CampaignCard";
import Link from "next/link";
import Button from "@presentation/common/Button";

const Prof = () => {
    return (
        <Layout>
            <title>D-Crowdfunding | Profile Page</title>
            <section className="flex flex-col object-center mt-[60px]">
                <img
                    src="/Ellipse 2.svg"
                    alt=""
                    className="h-[192px]"
                />
                <div className="flex flex-col mt-[10px] justify-center items-center gap-[10px]">
                    <div className="flex gap-[5px]">
                        <h2 className="font-bold text-lg">John Doe</h2>
                        <img
                            src="/octicon_verified-16.svg"
                            alt=""
                        />
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
                <div className="grid grid-cols-3 gap-[45px]">
                    {Array(3)
                    .fill(null)
                    .map((_,idx) => (
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
            <section className="flex flex-col">
                <H3 className="font-bold mt-[50px] mb-[50px]">Donated Campaigns</H3>
                <div className="grid grid-cols-3 gap-[45px]">
                    {Array(3)
                    .fill(null)
                    .map((_,idx) => (
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
    )
};

export default Prof;
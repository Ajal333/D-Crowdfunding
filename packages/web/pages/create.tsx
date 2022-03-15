import Button from "@presentation/common/Button";
import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import TextArea from "@presentation/common/TextArea";
import { H2, Label } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";
import React, { FormEvent } from "react";

const Create = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <HeadMeta
        title="D-Crowdfunding | Know how your donations are spent"
        description="D-Crowdfuncding is a decentralised platform for crowdfunding"
        image=""
        keywords=""
        url=""
      />
      <H2 className="mt-[50px]">Create Campaign</H2>
      <form
        className="flex flex-col max-w-[500px] mx-auto mt-[48px]"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="campaignName">Campaign Name</Label>
        <Input
          id="campaignName"
          placeholder="Enter Campaign Name"
          className="font-normal mb-[14px]"
        />
        <Label htmlFor="campaignDescription">Campaign Description</Label>
        <TextArea
          id="campaignDescription"
          placeholder="Enter Campaign Description"
          className="font-normal mb-[14px]"
        />
        <Label htmlFor="campaignName">Target Amount</Label>
        <Input
          id="targetAmount"
          placeholder="Enter Target Amount"
          className="font-normal mb-[14px]"
        />
        <Label htmlFor="minimumContribution">Minimum Contribution</Label>
        <Input
          id="minimumContribution"
          placeholder="Enter Minimum contribution amount"
          className="font-normal mb-[14px]"
        />
        <Label htmlFor="campaignImage">Upload Image</Label>
        <Input
          id="campaignImage"
          type="file"
          placeholder="Enter Minimum contribution amount"
          className="font-normal mb-[14px]"
        />
        <Button type="submit">Create Campaign</Button>
      </form>
    </Layout>
  );
};

export default Create;

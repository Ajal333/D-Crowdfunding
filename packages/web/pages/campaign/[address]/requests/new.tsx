import React, { FormEventHandler, useEffect, useState } from "react";

import Alert from "@presentation/common/Alert";
import Button from "@presentation/common/Button";
import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import TextArea from "@presentation/common/TextArea";
import { H2, Label } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

import web3 from "@infrastructure/web3";
import organisations from "@infrastructure/organisation";
import CrowdFunding from "@infrastructure/crowdfunding";

import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Requests = () => {
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  const [creatingCampaign, setCreatingCampaign] = useState<boolean>(false);

  const [errors] = useState<string[]>([]);

  const router = useRouter();
  const toast = useToast();

  const inputValidation = (): string[] => {
    const errors: string[] = [];
    if (description.length < 50) {
      errors.push("Description should be atleast 50 characters long");
    }
    if (!/^\d+$/.test(amount)) {
      errors.push("Request amount should be number");
    }
    return errors;
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setCreatingCampaign(true);
    try {
      e.preventDefault();
      inputValidation();
      const account = (await web3.eth.getAccounts())[0];
      console.log(account);
      const response = await CrowdFunding(router?.query?.address as string)
        .methods.createRequests(
          description,
          recipient,
          web3.utils.toWei(amount, "ether")
        )
        .send({
          from: account,
        });
      console.log(response);
      toast({
        title: "Request Created Successfully",
        description: `Your requestwas made.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Request Creation Error",
        description: `Your request to create a request could not be processed at the moment.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setCreatingCampaign(false);
    }
  };

  const checkOrganisationLoggedIn = async () => {
    try {
      const account = (await web3.eth.getAccounts())[0];
      const organisationAddresses: string[] = await organisations.methods
        .getAllOrganisation()
        .call();
      let loggedIn = false;

      organisationAddresses.forEach((address) => {
        if (address?.["organisationAddress"] === account) {
          loggedIn = true;
        }
      });
      if (!loggedIn) {
        // Show the modal to add account
        setShowModal(true);
        // alert("Please create an organisation account before creating campaign");
      }
    } catch (error) {
      console.log("error @ checkOrganisationLoggedIn :>> ", error);
    }
  };

  useEffect(() => {
    checkOrganisationLoggedIn();
  }, []);

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
        <H2 className="mt-[50px]">Request Fund</H2>
        <form
          className="flex flex-col max-w-[500px] mx-auto mt-[48px]"
          onSubmit={handleSubmit}
        >
          <div className="z-[-1]">
            {errors?.map((error, key) => (
              <Alert className="my-2" status="error" text={error} key={key} />
            ))}
          </div>
          <Label htmlFor="requestDescription">Request Description</Label>
          <TextArea
            id="requestDescription"
            placeholder="Enter Request Description"
            className="font-normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-between text-[18px] mt-[10px] mb-[14px]">
            <small>Min. 50 characters</small>
            <small
              className={
                description.length < 50
                  ? "text-red-500 font-bold"
                  : "text-green-500 font-bold"
              }
            >
              {description.length}
            </small>
          </div>
          <Label htmlFor="campaignName">Request Amount</Label>
          <Input
            id="targetAmount"
            placeholder="Enter Request Amount"
            className="font-normal mb-[14px]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Label htmlFor="minimumContribution">Recipient Address</Label>
          <Input
            id="minimumContribution"
            placeholder="Enter Minimum contribution amount"
            className="font-normal mb-[14px]"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
          <Button
            loadingText="Creating campaign"
            isLoading={creatingCampaign}
            type="submit"
          >
            Create Request
          </Button>
        </form>
      </Layout>
    </>
  );
};

export default Requests;

import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { create } from "ipfs-http-client";

import Alert from "@presentation/common/Alert";
import Button from "@presentation/common/Button";
import HeadMeta from "@presentation/common/HeadMeta";
import Input from "@presentation/common/Input";
import TextArea from "@presentation/common/TextArea";
import { H2, Label } from "@presentation/common/Typography";
import Layout from "@presentation/Layout";

import web3 from "@infrastructure/web3";
import campaigns from "@infrastructure/campaigns";
import organisations from "@infrastructure/organisation";
import { useToast } from "@chakra-ui/react";
import CustomModal from "@presentation/common/Modal";

const Create = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [minContribution, setMinContribution] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [savingOrganisation, setSavingOrgaisation] = useState<boolean>(false);
  const [orgName, setOrgName] = useState<string>("");
  const [orgWebsite, setOrgWebsite] = useState<string>("");

  const [creatingCampaign, setCreatingCampaign] = useState<boolean>(false);

  const [errors, setErrors] = useState<string[]>([]);

  const toast = useToast();

  const inputValidation = (e: FormEvent<HTMLFormElement>): string[] => {
    const errors: string[] = [];
    if (name.length < 3) {
      errors.push("Name should be atleast 6 characters long");
    }
    if (description.length < 50) {
      errors.push("Description should be atleast 50 characters long");
    }
    if (!/^\d+$/.test(target)) {
      errors.push("Target amount should be number");
    }
    if (!/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(minContribution)) {
      errors.push("Minimum Contribution should be number");
    }
    if (!e?.target?.[5]?.files?.[0]) {
      errors.push("Add a valid image");
    }
    const referenceDate = new Date(deadline).getTime();
    const diffTime: number = Math.abs(referenceDate - new Date().getTime());
    if (diffTime <= 0) {
      errors.push("Deadline should be a date of future");
    }
    return errors;
  };

  const createOrganisation: FormEventHandler<HTMLFormElement> = async (e) => {
    setSavingOrgaisation(true);
    try {
      e.preventDefault();
      // setErrors([]);
      const accounts = await web3.eth.getAccounts();
      console.log("account:", accounts);
      const ipfsClient = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
      });
      const image = await ipfsClient.add(e?.target?.[2]?.files?.[0]);
      const imageUrl = `https://ipfs.infura.io/ipfs/${image.path}`;
      console.log("imageUrl: ", imageUrl);

      const data = await organisations.methods
        .addOrganisation(orgName, orgWebsite, imageUrl)
        .send({
          from: accounts[0],
        });
      console.log(data);
      toast({
        title: "Organisation Created.",
        description: `We've signed you up as an orgaisation named, ${orgName}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Creating organisation failed.",
        description: `Your request to create an organisation named ${orgName} could not be processed at the moment.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setSavingOrgaisation(false);
      setShowModal(false);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setCreatingCampaign(true);
    try {
      e.preventDefault();
      setErrors([]);
      const errors = inputValidation(e);
      setErrors(errors);
      if (errors.length === 0) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        const ipfsClient = create({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
        });
        const image = await ipfsClient.add(e?.target?.[5]?.files?.[0]);
        const imageUrl = `https://ipfs.infura.io/ipfs/${image.path}`;
        console.log(imageUrl);
        const referenceDate = new Date(deadline).getTime();

        const data = await campaigns.methods
          .createCampaign(
            web3.utils.toWei(minContribution, "ether"),
            web3.utils.toWei(target, "ether"),
            referenceDate,
            name,
            description,
            imageUrl
          )
          .send({
            from: accounts[0],
          });
        console.log(data);
        toast({
          title: "Campaign Created",
          description: `We've created your campaign named ${name}`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Campaign Creation Error",
        description: `Your request to create a campaign named ${name} could not be processed at the moment.`,
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
        <H2 className="mt-[50px]">Create Campaign</H2>
        <form
          className="flex flex-col max-w-[500px] mx-auto mt-[48px]"
          onSubmit={handleSubmit}
        >
          <div className="z-[-1]">
            {errors?.map((error, key) => (
              <Alert className="my-2" status="error" text={error} key={key} />
            ))}
          </div>
          <Label htmlFor="campaignName">Campaign Name</Label>
          <Input
            id="campaignName"
            placeholder="Enter Campaign Name"
            className="font-normal mb-[14px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Label htmlFor="campaignDescription">Campaign Description</Label>
          <TextArea
            id="campaignDescription"
            placeholder="Enter Campaign Description"
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
          <Label htmlFor="campaignName">Target Amount</Label>
          <Input
            id="targetAmount"
            placeholder="Enter Target Amount"
            className="font-normal mb-[14px]"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
          <Label htmlFor="minimumContribution">Minimum Contribution</Label>
          <Input
            id="minimumContribution"
            placeholder="Enter Minimum contribution amount"
            className="font-normal mb-[14px]"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
            required
          />
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            className="font-normal mb-[14px]"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <Label htmlFor="campaignImage">Upload Image</Label>
          <Input
            id="campaignImage"
            type="file"
            placeholder="Enter Minimum contribution amount"
            className="font-normal mb-[14px]"
            accept="image/jpeg, image/png"
            required
          />
          <Button
            loadingText="Creating campaign"
            isLoading={creatingCampaign}
            type="submit"
          >
            Create Campaign
          </Button>
        </form>
      </Layout>
      {showModal && (
        <CustomModal
          // extraFooter={}
          title="Organization Sign Up"
          closeModal={setShowModal}
        >
          <form
            className="flex flex-col max-w-[500px] mx-auto mt-[48px]"
            onSubmit={createOrganisation}
          >
            <div className="z-[-1]">
              {errors?.map((error, key) => (
                <Alert className="my-2" status="error" text={error} key={key} />
              ))}
            </div>
            <Label htmlFor="organisationName">Organisation Name</Label>
            <Input
              id="organisationName"
              placeholder="Enter Organisation Name"
              className="font-normal mb-[14px]"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
            <Label htmlFor="websiteUrl">Website Url</Label>
            <Input
              id="websiteUrl"
              placeholder="Enter Website Url"
              className="font-normal mb-[14px]"
              value={orgWebsite}
              onChange={(e) => setOrgWebsite(e.target.value)}
              required
            />

            <Label htmlFor="organisationImage">Upload Organisation Image</Label>
            <Input
              id="organisationImage"
              type="file"
              placeholder="Upload Organisation Image"
              className="font-normal mb-[14px]"
              accept="image/jpeg, image/png"
              required
            />
            <Button
              isLoading={savingOrganisation}
              loadingText="Saving orgaisation..."
              colorScheme="blue"
              size="sm"
              type="submit"
            >
              Save organisation
            </Button>
          </form>
        </CustomModal>
      )}
    </>
  );
};

export default Create;

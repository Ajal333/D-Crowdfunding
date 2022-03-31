import Link from "next/link";
import Button from "../Button";

interface Props {
  title: string;
  description: string;
}

const CampaignCard = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-start border border-[#BEBEBE] rounded-[6px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1607703703674-df96af81dffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtcGFpZ258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        alt={title}
        className="h-[160px] w-full object-cover object-center"
      />
      <div className="p-[30px]">
        <h4 className="text-[18px] font-semibold">{title}</h4>
        <p className="my-[16px]">{description}</p>
        <Link href="/campaign/id">
          <a>
            <Button className="text-[14px] font-semibold py-[8px] px-[18px]">
              View Details
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;

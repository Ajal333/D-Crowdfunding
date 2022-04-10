import Link from "next/link";
import Button from "../Button";

interface Props {
  title: string;
  description: string;
  address?: string;
  image?: string;
}

const CampaignCard = ({ title, description, address, image }: Props) => {
  return (
    <div className="flex flex-col items-start bg-white border border-[#BEBEBE] rounded-[6px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="h-[160px] w-full object-cover object-center rounded-t-[6px]"
      />
      <div className="p-[30px]">
        <h4 className="text-[18px] font-semibold">{title}</h4>
        <p className="my-[16px]">
          {description.length > 70
            ? `${description.slice(0, 67)}...`
            : description}
        </p>
        <Link href={`/campaign/${address}`}>
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

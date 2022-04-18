import { getMaticPriceInUSD } from "@infrastructure/getMaticToUSD";
import { currency } from "common/constants";
import Link from "next/link";

interface Props {
  title: string;
  address?: string;
  image?: string;
  organization?: string;
  raisedAmount?: number;
  targetAmount?: number;
  description?: string;
  maticPrice?: number | null;
}

const CampaignCard = ({
  title,
  address,
  image,
  organization,
  raisedAmount,
  targetAmount,
  maticPrice,
}: Props) => {
  return (
    <Link href={`/campaign/${address}`}>
      <a className="flex flex-col items-start bg-white border border-[#BEBEBE] rounded-[6px] transition-all duration-300 ease-in-out hover:translate-y-[-30px] hover:shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="bg-black rounded-t-[6px] w-full">
          <img
            src={image}
            alt={title}
            className="h-[230px] w-full object-cover object-center rounded-t-[6px]"
          />
        </div>
        <div className="p-[30px] w-full">
          <h4 className="text-[20px] font-semibold">{title}</h4>
          <p>
            by{" "}
            <span className="font-bold">
              {organization?.slice(0, 8)}...{organization?.slice(-8)}
            </span>
          </p>
          <h5 className="mt-[20px] text-[20px] font-semibold">
            {raisedAmount} {currency}{" "}
            <span className="font-normal text-gray-600">
              {maticPrice !== null &&
                `($${getMaticPriceInUSD(raisedAmount, maticPrice)})`}
            </span>
          </h5>
          <div className="w-full">
            <p>
              target of {targetAmount} {currency}{" "}
              <span className="font-normal text-gray-600">
                {maticPrice !== null &&
                  `($${getMaticPriceInUSD(targetAmount, maticPrice)})`}
              </span>
            </p>
            <div className="h-[10px] mt-4 w-full bg-gray-200">
              <div
                className="h-full bg-[#31CF41]"
                style={{
                  width: `${
                    raisedAmount > targetAmount
                      ? "100"
                      : (raisedAmount * 100) / targetAmount
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CampaignCard;

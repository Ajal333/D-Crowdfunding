import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] pt-[50px]">
      <div className="flex w-full flex-col mx-auto max-w-[1440px] px-[32px] md:px-[64px] lg:px-[120px]">
        <div className="flex justify-between w-full mb-[32px]">
          <h2>D-Crowdfunding</h2>
          <ul className="flex flex-col">
            <Link href="/" passHref>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link href="/works" passHref>
              <li className="cursor-pointer">How it works?</li>
            </Link>
            <Link href="/create" passHref>
              <li className="cursor-pointer">Create Campaign</li>
            </Link>
            <Link href="/campaigns" passHref>
              <li className="cursor-pointer">Active Campagins</li>
            </Link>
          </ul>
        </div>
        <div className="flex py-[10px] border-t border-gray-300 items-center justify-center text-[14px] font-bold">
          &#169; 2022 | D-Crowdfunding
        </div>
      </div>
    </footer>
  );
};

export default Footer;

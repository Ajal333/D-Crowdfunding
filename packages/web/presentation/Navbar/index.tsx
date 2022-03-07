import Link from "next/link";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full">
      <div className="flex max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] py-[16px]">
        <Link href="/" passHref>
          <h2 className="flex flex-1 items-center font-bold cursor-pointer">
            D-Crowdfunding
          </h2>
        </Link>
        <nav className="flex-1 flex items-center justify-center">
          <ul className="w-full flex items-center justify-around">
            <Link href="/" passHref>
              <li className="cursor-pointer">Home</li>
            </Link>
            <li className="cursor-pointer">How it works?</li>
            <li className="cursor-pointer">Create Campaign</li>
            <Link href="/campaigns" passHref>
              <li className="cursor-pointer">Active Campagins</li>
            </Link>
            <li className="cursor-pointer">Profile</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

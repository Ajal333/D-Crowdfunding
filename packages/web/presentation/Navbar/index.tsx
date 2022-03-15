import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [bg, setBg] = useState<string>("");

  useEffect(() => {
    addEventListener<"scroll">("scroll", handleScroll);

    return () =>
      removeEventListener<"scroll">("scroll", () => {
        return;
      });
  }, []);

  const handleScroll: EventListener = () => {
    const top = window.scrollY;
    // filter backdrop-blur-md border-b-[0.5px] border-[#dadada]
    if (top > 100) setBg("bg-white");
    else setBg("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full ${bg} transition-all ease-in duration-300`}
    >
      <div className="flex max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] py-[20px]">
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

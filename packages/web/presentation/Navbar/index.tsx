import useWeb3Provider from "context/Web3Provider";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [bg, setBg] = useState<string>("");
  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);
  const [accountText, setAccountText] = useState<string>();

  const { connectWallet, account, disconnectWallet } = useWeb3Provider();

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
    <>
      <div
        className={`fixed top-0 left-0 w-full z-[60] ${bg} transition-all ease-in duration-300`}
      >
        <div className="flex max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] py-[20px]">
          <Link href="/" passHref>
            <h2 className="flex flex-1 items-center font-bold cursor-pointer">
              D-Crowdfunding
            </h2>
          </Link>
          <nav className="flex-[2] flex items-center justify-end lg:justify-center">
            <ul className="hidden w-full lg:flex items-center justify-around">
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
              {/* <Link href="/profile" passHref>
                <li className="cursor-pointer">Profile</li>
              </Link> */}
              {account ? (
                <button
                  className="cursor-pointer text-white w-[180px] text-center font-bold bg-[#31CF41] py-[10px] px-[20px] rounded-full"
                  onMouseEnter={() => setAccountText("Logout")}
                  onMouseLeave={() =>
                    setAccountText(
                      `${account.slice(0, 5)}...${account.slice(-5)}`
                    )
                  }
                  onClick={disconnectWallet}
                >
                  {accountText ??
                    `${account.slice(0, 5)}...${account.slice(-5)}`}
                </button>
              ) : (
                <button
                  className="cursor-pointer text-white w-[180px] text-center font-bold bg-[#31CF41] py-[10px] px-[20px] rounded-full"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </ul>
            <div
              className="flex z-100 lg:hidden flex-col items-center justify-end"
              onClick={() => setNavbarExpanded((prev) => !prev)}
            >
              <span
                className={`h-[2px] w-[30px] bg-black mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                  navbarExpanded
                    ? "transform -rotate-45 origin-center translate-y-[6px]"
                    : ""
                }`}
              ></span>
              <span
                className={`h-[2px] w-[30px] bg-black mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                  navbarExpanded ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`h-[2px] w-[30px] bg-black mb-[4px] rounded-full transition-all duration-300 ease-in-out ${
                  navbarExpanded
                    ? "transform rotate-45 origin-center -translate-y-[6px]"
                    : ""
                }`}
              ></span>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ease-in-out ${
          navbarExpanded ? "h-[200px]" : "h-0"
        }`}
      >
        <ul
          className={`flex flex-col justify-center h-full space-y-[10px] bg-white z-50  md:mx-[50px] rounded-[20px] mt-[8vh] overflow-hidden transition-all duration-200 ease-in-out ${
            navbarExpanded && "p-[30px]"
          }`}
        >
          <Link href="/" passHref>
            <li
              className={`tex60 font-semibold ${
                !navbarExpanded && "opacity-0"
              }`}
            >
              Home
            </li>
          </Link>

          <Link href="/works" passHref>
            <li
              className={`tex60 font-semibold ${
                !navbarExpanded && "opacity-0"
              }`}
            >
              How it works?
            </li>
          </Link>
          <Link href="/create" passHref>
            <li
              className={`tex60 font-semibold ${
                !navbarExpanded && "opacity-0"
              }`}
            >
              Create Campaign
            </li>
          </Link>
          <Link href="/campaigns" passHref>
            <li
              className={`tex60 font-semibold ${
                !navbarExpanded && "opacity-0"
              }`}
            >
              Active Campagins
            </li>
          </Link>
          {/* <Link href="/profile" passHref>
            <li
              className={`tex60 font-semibold ${
                !navbarExpanded && "opacity-0"
              }`}
            >
              Profile
            </li>
          </Link> */}
        </ul>
      </div>
    </>
  );
};

export default Navbar;

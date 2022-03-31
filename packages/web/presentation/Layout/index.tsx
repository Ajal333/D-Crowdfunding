import Navbar from "@presentation/Navbar";
import Footer from "@presentation/Footer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <main className="w-full mt-[50px] min-h-[70vh] mb-[100px] mx-auto max-w-[1440px] px-[32px] md:px-[64px] lg:px-[120px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

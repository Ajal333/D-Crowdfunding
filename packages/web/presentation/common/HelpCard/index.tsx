const HelpCard = ({ title, description }) => {
  return (
    <div className="flex flex-col max-w-[336px] items-start border border-[#BEBEBE] rounded-[6px]">
      <img
        src="/Ellipse 1.png"
        alt=""
        className="h-[100px] mt-8 w-full object-contain object-center"
      />
      <div className="p-[30px]">
        <h4 className="text-[18px] font-semibold text-center">{title}</h4>
        <p className="px-6 my-[16px] text-center">{description}</p>
      </div>
    </div>
  );
};

export default HelpCard;

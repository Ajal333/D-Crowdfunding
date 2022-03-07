const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  return (
    <input
      {...props}
      className={`text-[#000000] font-bold bg-[#FFFFFF] border-[1px] border-[#ABABAB] border-solid px-[60px] py-[15px]  rounded-[6px] ${props.className}`}
    />
  );
};

export default Input;

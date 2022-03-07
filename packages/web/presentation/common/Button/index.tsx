const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={`text-white font-bold bg-[#31CF41] px-[60px] py-[15px] rounded-[6px] ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

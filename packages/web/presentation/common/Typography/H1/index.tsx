const H1 = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <h1
      className={`leading-[50px] md:leading-[74px] font-black text-[50px] md:text-[72px] text-center lg:max-w-[780px] mx-auto ${props.className}`}
    >
      {props.children}
    </h1>
  );
};

export default H1;

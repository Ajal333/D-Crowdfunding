const H3 = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <h2 className={`text-[32px] font-bold ${props.className}`}>
      {props.children}
    </h2>
  );
};

export default H3;

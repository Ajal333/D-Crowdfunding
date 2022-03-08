const H2 = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <h2 className={`text-[48px] font-bold ${props.className}`}>
      {props.children}
    </h2>
  );
};

export default H2;

const P = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <p className={`w-3/5 leading-7 ${props.className}`}>{props.children}</p>
  );
};

export default P;

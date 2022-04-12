const H5 = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) => {
  return (
    <h5 className={`w-4/5 md:w-3/5 leading-7 ${props.className}`}>
      {props.children}
    </h5>
  );
};

export default H5;

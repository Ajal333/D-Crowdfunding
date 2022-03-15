const Label = (
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >
) => {
  return (
    <label {...props} className={`font-semibold text-[18px] mb-[10px]`}></label>
  );
};

export default Label;

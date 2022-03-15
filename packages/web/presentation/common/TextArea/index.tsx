const TextArea = (
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) => {
  return (
    <textarea
      {...props}
      className={`border-[1px] outline-none border-[#ABABAB] px-[20px] py-[15px] rounded-[6px] resize-none ${props.className}`}
      rows={5}
    />
  );
};

export default TextArea;

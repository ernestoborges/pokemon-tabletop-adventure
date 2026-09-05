import { useState } from "react";
import Select from "../atoms/select";
import { MdClose } from "react-icons/md";

export default function SelectField({
  options,
  value,
  placeholder,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOptionChange = (value: string) => {
    setIsSelected(value !== "");
    onChange(value);
  };

  return (
    <div
      className={`rounded-md flex items-stretch shadow-md overflow-hidden ${isSelected ? "bg-selected" : "bg-card"}`}
    >
      <div className="hover:bg-black/10">
        <Select
          options={options}
          value={value}
          placeholder={placeholder}
          onChange={handleOptionChange}
        />
      </div>
      <div
        className={`relative flex items-stretch overflow-hidden transition-all duration-400 ${isSelected ? "max-w-10" : "max-w-0"}`}
      >
        <button
          type="button"
          className="flex w-8 cursor-pointer items-center justify-center p-2 hover:bg-black/10"
          onClick={() => handleOptionChange("")}
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
}

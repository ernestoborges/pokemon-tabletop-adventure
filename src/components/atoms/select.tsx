export default function Select({
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
  return (
    <select
      className={`w-full min-w-0 p-2 text-lg outline-none cursor-pointer`}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

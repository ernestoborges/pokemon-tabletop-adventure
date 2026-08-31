export default function LabeledText({
  label,
  uppercase = false,
  colon = false,
  children,
}: {
  label: string;
  uppercase?: boolean;
  colon?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt
        className={`inline font-bold text-primary ${uppercase ? "uppercase" : ""}`}
      >
        {label}
        {colon ? ":" : ""}
      </dt>{" "}
      <dd className="inline text-primary">{children}</dd>
    </div>
  );
}

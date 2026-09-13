export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`cursor-pointer ${className}`} {...props}>
      {children}
    </button>
  );
}

import Button from "./button";

export default function ButtonSelect({
  children,
  color = "base",
  shape = "square",
  selected = false,
  className,
  ...props
}: {
  color?: "base" | "blue";
  shape?: "pill" | "square";
  selected?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  function getColorClass() {
    switch (color) {
      case "blue":
        return `${selected ? "bg-blue text-white hover:bg-blue-hover" : "bg-card text-primary hover:bg-background-hover"}`;
      case "base":
      default:
        return `${selected ? "bg-primary text-secondary hover:bg-primary-hover" : "bg-card text-primary hover:bg-background-hover"}`;
    }
  }

  function getShapeClass() {
    switch (shape) {
      case "pill":
        return "rounded-full";
      case "square":
      default:
        return "rounded-md";
    }
  }

  return (
    <Button
      className={`shadow-md px-4 py-2 ${getColorClass()} ${getShapeClass()} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

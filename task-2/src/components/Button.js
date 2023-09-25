
export default function Button({
  onClick,
  className,
  type = "button",
  children,
}) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
}

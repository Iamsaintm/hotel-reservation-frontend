export default function Button({
  type = "text",
  onClick,
  children,
  className,
}) {
  return (
    <button
      type={type}
      className={`px-3 py-1.5 hover:bg-gray-100 text-blue-600 rounded-md bg-black ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

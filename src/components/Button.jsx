export default function Button({ onClick, children, className, type }) {
  return (
    <button
      type={type || "submit"}
      className={`px-3 py-1.5 hover:bg-gray-100 hover:text-black text-white rounded-md bg-black ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

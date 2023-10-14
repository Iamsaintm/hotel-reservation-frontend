export default function LoginInput({
  placeholder,
  type = "text",
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
      value={value}
      onChange={onChange}
    />
  );
}

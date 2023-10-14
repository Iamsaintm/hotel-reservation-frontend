export default function Input({
  placeholder,
  type = "text",
  value,
  onChange,
  text,
}) {
  return (
    <div className="flex flex-col">
      <p className="text-center">{text}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="block w-50 text-black rounded-md px-4 py-3 outline-none border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        value={value}
        onChange={onChange}
      />{" "}
    </div>
  );
}
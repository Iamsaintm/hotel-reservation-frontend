import SearchRoom from "../features/search/SearchRoom";

export default function HomePage() {
  return (
    <div className="bg-[url('../assets/Home.jpg')] h-screen flex justify-center items-center">
      <SearchRoom />
    </div>
  );
}

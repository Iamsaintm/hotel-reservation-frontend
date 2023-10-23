import SearchRoom from "../features/search/SearchRoom";
import Home from "../assets/Home.jpg";

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <div className="h-full flex justify-center items-center object-cover fixed">
        <div className="absolute top-60">
          <p className="text-center text-orange-500 font-Gilda text-8xl">
            PARADISE
          </p>
          <p className="text-center text-black font-Barlow text-5xl">
            HOTEL LUXURY
          </p>
        </div>
        <img src={Home} alt="Home" />
        <div className="absolute top-1/2">
          <SearchRoom />
        </div>
      </div>
    </div>
  );
}

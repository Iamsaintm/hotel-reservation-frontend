import SearchRoom from "../features/search/SearchRoom";

import home from "../assets/Home.jpeg";

export default function HomePage() {
  return (
    <div>
      <div className="h-96 overflow-hidden">
        <img src={home} alt="Home Page" className="m-auto w-full" />
      </div>
      <div>
        <SearchRoom />
      </div>
      <div>Hotel</div>
      <div>Room</div>
    </div>
  );
}

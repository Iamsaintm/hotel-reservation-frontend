import SearchRoom from "../features/search/SearchRoom";

import home from "../assets/Home.jpeg";

export default function HomePage() {
  return (
    <div>
      <div>
        <img src={home} alt="Home Page" className="m-auto w-screen h-1/2 " />
      </div>
      <div>
        <SearchRoom />
      </div>
      <div>Hotel</div>
      <div>Room</div>
    </div>
  );
}

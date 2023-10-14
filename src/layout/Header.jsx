import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="grid grid-cols-2 px-16 bg-black shadow-lg sticky top-0 z-30 items-center">
      <div className="justify-self-start flex flex-col">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="justify-self-end text-white">
        <Dropdown />
      </div>
    </header>
  );
}

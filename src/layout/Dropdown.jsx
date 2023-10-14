import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import UserModal from "../features/auth/UserModal";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const dropdownEl = useRef(null);

  const { logout, authUser } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownEl.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="relative">
      <div>
        <UserModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          authUser={authUser}
          logout={logout}
          setIsOpenLogin={setIsOpenLogin}
          isOpenLogin={isOpenLogin}
        />
      </div>
    </div>
  );
}

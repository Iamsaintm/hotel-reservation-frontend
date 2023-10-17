import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import UserModal from "../features/auth/UserModal";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const dropdownEl = useRef(null);

  const { logout, authUser, showLoginForm, setShowLoginForm } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownEl.current.contains(e.target)) {
        if (!isOpenForm) {
          setIsOpen(false);
          setActiveForm(null);
          setShowLoginForm(false);
        }
        if (showLoginForm) {
          setIsOpen(true);
          setActiveForm("logIn");
        }
        setIsOpenForm(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpenForm, setShowLoginForm, showLoginForm]);
  return (
    <div className="relative" ref={dropdownEl}>
      <div>
        <UserModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          authUser={authUser}
          logout={logout}
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          setIsOpenForm={setIsOpenForm}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Bar3, UserCircle } from "../../icon";
import SignUpForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";

export default function UserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null);

  const openForm = (formName) => {
    setActiveForm(formName);
  };

  const closeUserModal = () => {
    setIsOpen(false);
  };

  const { authUser, logout } = useAuth();

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex bg-orange-500 rounded-full p-0.5 gap-2"
      >
        <Bar3 />
        <UserCircle />
      </button>
      <div>
        {isOpen && (
          <div className="w-48 absolute bg-black right-0 translate-y-1 border rounded-xl shadow-xl p-2">
            <div
              className={`flex gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-xl justify-center ${
                activeForm === "signUp" ? "text-orange-500" : ""
              }`}
              onClick={() => {
                openForm("signUp");
              }}
            >
              Sign Up
            </div>
            <hr className="m-2 border" />
            <div
              className={`flex gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-xl justify-center ${
                activeForm === "logIn" ? "text-orange-500" : ""
              }`}
              onClick={() => {
                openForm("logIn");
              }}
            >
              Log In
            </div>
          </div>
        )}
      </div>
      <div>
        {isOpen &&
          (activeForm === "signUp" || activeForm === "logIn") &&
          !authUser && (
            <div className="w-48 absolute bg-black right-0 translate-y-1 border rounded-xl shadow-xl p-2">
              {activeForm === "signUp" ? (
                <SignUpForm logIn={() => openForm("logIn")} />
              ) : (
                <LogInForm signUp={() => openForm("signUp")} />
              )}
            </div>
          )}
      </div>

      {isOpen && authUser && (
        <div className="w-48 absolute bg-black right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link to={`/user/booking`}>
            <div className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center">
              Reservation
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center"
            onClick={() => {
              logout();
              closeUserModal();
            }}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

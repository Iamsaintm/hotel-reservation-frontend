import { Bar3, UserCircle } from "../../icon";
import SignUpForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import { Link } from "react-router-dom";

export default function UserModal({
  setIsOpen,
  isOpen,
  authUser,
  logout,
  activeForm,
  setActiveForm,
  setIsOpenForm,
}) {
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveForm(null);
          setIsOpenForm(false);
        }}
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
                setActiveForm("signUp");
                setIsOpenForm(true);
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
                setActiveForm("logIn");
                setIsOpenForm(true);
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
                <SignUpForm
                  logIn={() => setActiveForm("logIn")}
                  setIsOpen={setIsOpen}
                  setIsOpenForm={setIsOpenForm}
                />
              ) : (
                <LogInForm
                  signUp={() => setActiveForm("signUp")}
                  setIsOpen={setIsOpen}
                  setIsOpenForm={setIsOpenForm}
                />
              )}
            </div>
          )}
      </div>

      {isOpen && authUser.role === "USER" && (
        <div className="w-48 absolute bg-black right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link
            to={`/reservation/${authUser.id}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center">
              Reservation
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            Log Out
          </div>
        </div>
      )}
      {isOpen && authUser.role === "ADMIN" && (
        <div className="w-48 absolute bg-black right-0 translate-y-1 border rounded-xl shadow-xl p-2">
          <Link
            to={`/reservation/${authUser.id}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center">
              Reservation
            </div>
          </Link>
          <hr className="m-2 border" />
          <Link to={`/admin`} onClick={() => setIsOpen(false)}>
            <div className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center">
              Admin Reservation
            </div>
          </Link>
          <hr className="m-2 border" />
          <div
            className="flex gap-4 p-2 cursor-pointer hover-bg-gray-100 rounded-xl justify-center"
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

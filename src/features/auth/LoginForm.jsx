import { useState } from "react";
import { toast } from "react-toastify";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-auth";

export default function LoginForm({ signUp, setIsOpen, setIsOpenForm }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    login(input)
      .then((res) => {
        if (res) {
          setIsOpen(false);
        }
      })
      .catch(() => {
        toast.error("Email or password incorrect");
      });
  };

  return (
    <form className="grid gap-4">
      <div className="flex justify-around items-center gap-52">
        <div className="text-2xl">Log in</div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-lg text-gray-400"
        >
          X
        </button>
      </div>

      <LoginInput
        placeholder="Email address"
        value={input.email}
        onChange={(e) => {
          return setInput({ ...input, email: e.target.value });
        }}
      />
      <LoginInput
        type="password"
        placeholder="Password"
        value={input.password}
        onChange={(e) => {
          return setInput({ ...input, password: e.target.value });
        }}
      />
      <div className="mx-auto col-span-full flex flex-col">
        <button
          className="bg-green-500 text-white w-full rounded-md text-xl font-bold py-2.5"
          onClick={handleSubmitForm}
        >
          Log in
        </button>
        <div className="flex justify-center items-center gap-2">
          <p>{"Don't have an account?"}</p>

          <button
            onClick={() => {
              signUp();
              setIsOpenForm(true);
            }}
            className={"text-blue-500"}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

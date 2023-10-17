import { useState } from "react";
import { toast } from "react-toastify";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-auth";
import Button from "../../components/Button";

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
      <Button
        type={"button"}
        onClick={() => {
          signUp();
          setIsOpenForm(true);
        }}
        className={"text-white"}
      >
        Sign Up
      </Button>
      Log In
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
      <button
        className="bg-blue-500 text-white w-full rounded-md text-xl font-bold py-2.5"
        onClick={handleSubmitForm}
      >
        Log in
      </button>
    </form>
  );
}

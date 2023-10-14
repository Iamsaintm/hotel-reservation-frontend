import { useState } from "react";
import { toast } from "react-toastify";
import LoginInput from "./LoginInput";
import { useAuth } from "../../hooks/use-auth";
import Button from "../../components/Button";

export default function LoginForm({ signUp }) {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    login(input).catch((err) => {
      toast.error(err.response?.data.message);
    });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmitForm}>
      <Button onClick={signUp} className={"text-white"}>
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
        type="submit"
        className="bg-blue-500 text-white w-full rounded-md text-xl font-bold py-2.5"
      >
        Log in
      </button>
    </form>
  );
}

import { useState } from "react";
import { toast } from "react-toastify";
import RegisterInput from "./RegisterInput";
import Joi from "joi";
import InputErrorMessage from "./InputErrorMessage";
import { useAuth } from "../../hooks/use-auth";

const registerSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.alternatives([Joi.string().email({ tlds: false })]).required(),
  phoneNumber: Joi.alternatives([
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).trim().required(),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function RegisterForm({ logIn, setIsOpen, setIsOpenForm }) {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const { register } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validationError = validateRegister(input);
    if (validationError) {
      return setError(validationError);
    }
    setError({});
    register(input)
      .then(setIsOpen(false))
      .catch((err) => {
        toast.error(err.response?.data.message);
      });
  };
  return (
    <form className="grid grid-cols-1 gap-x-3 gap-y-4 ">
      <div className="flex justify-around gap-52">
        <div className="text-2xl text-center">Register</div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-lg text-gray-400"
        >
          X
        </button>
      </div>

      <div>
        <RegisterInput
          placeholder="First name"
          value={input.firstName}
          onChange={handleChangeInput}
          name="firstName"
          hasError={error.firstName}
        />
        {error.firstName && <InputErrorMessage message={error.firstName} />}
      </div>
      <div>
        <RegisterInput
          placeholder="Last name"
          value={input.lastName}
          onChange={handleChangeInput}
          name="lastName"
          hasError={error.lastName}
        />
        {error.lastName && <InputErrorMessage message={error.lastName} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Email address"
          value={input.email}
          onChange={handleChangeInput}
          name="email"
          hasError={error.email}
        />
        {error.email && <InputErrorMessage message={error.email} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Phone number"
          value={input.phoneNumber}
          onChange={handleChangeInput}
          name="phoneNumber"
          hasError={error.phoneNumber}
        />
        {error.phoneNumber && <InputErrorMessage message={error.phoneNumber} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Password"
          type="password"
          value={input.password}
          onChange={handleChangeInput}
          name="password"
          hasError={error.password}
        />
        {error.password && <InputErrorMessage message={error.password} />}
      </div>
      <div className="col-span-full">
        <RegisterInput
          placeholder="Confirm password"
          type="password"
          value={input.confirmPassword}
          onChange={handleChangeInput}
          name="confirmPassword"
          hasError={error.confirmPassword}
        />
        {error.confirmPassword && (
          <InputErrorMessage message={error.confirmPassword} />
        )}
      </div>
      <div className="mx-auto col-span-full flex flex-col">
        <button
          className="bg-green-500 rounded-lg text-white px-3 py-1.5 font-bold min-w-[10rem]"
          onClick={handleSubmitForm}
        >
          Sign up
        </button>
        <div className="flex justify-center items-center gap-2">
          <p>{"You have an account?"}</p>

          <button
            onClick={() => {
              logIn();
              setIsOpenForm(true);
            }}
            className={"text-blue-500"}
          >
            Login here
          </button>
        </div>
      </div>
    </form>
  );
}

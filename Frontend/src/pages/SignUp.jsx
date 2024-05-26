// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSignup } from "../hook/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { signup, error, isLoading, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      await signup(email, password, firstName, lastName);
    } else {
      setError("Passwords are not match");
    }
  };

  return (
    <div className=" w-10/12 mx-auto flex items-center justify-center">
      <div className=" w-[500px] mt-14 border rounded-lg p-4  border-pure-greys-50 shadow-xl">
        <h1 className="m-2 p-2 font-bold text-4xl mb-4">Signed Up Yourself</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-4 m-2 p-2 ">
            <label>
              First Name 
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="border  h-[35px] p-2 rounded-md border-black ml-2 lg:ml-0"
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="border  h-[35px] p-2 rounded-md border-black ml-2 lg:ml-0"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 m-2 p-2">
            Email Address
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              className="border  h-[35px] p-2 w-full rounded-md border-black"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>

          <div className="flex  flex-col lg:flex-row gap-4 m-2 p-2">
            <label>
              Create Password
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="border  h-[35px] p-2 rounded-md border-black ml-2 lg:ml-0"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter password"
                className="border  h-[35px] p-2 rounded-md border-black ml-2 lg:ml-0"
                onChange={(e) => {
                  SetConfirmPassword(e.target.value);
                }}
              />
            </label>
          </div>

          <div className=" m-2 p-2">
            <button
              type="submit"
              className=" border border-black w-full rounded-md p-1 font-semibold bg-yellow-50"
              disabled={isLoading}
            >
              Sign Up
            </button>
            {error && <div className="error text-pink-400 p-1">* {error} *</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

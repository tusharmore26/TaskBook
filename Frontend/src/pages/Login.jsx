import React, { useState } from "react";
import { useLogin } from "../hook/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className=" w-10/12 mx-auto flex items-center justify-center">
      <div className=" w-[400px] mt-14 border rounded-lg p-4  border-pure-greys-50 shadow-xl">
        <h1 className="m-2 p-2 font-bold text-4xl mb-4">Logged In Yourself</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 m-2 p-2">
            Enter Email Id
            <input
              type="email"
              id="emailId"
              placeholder="Enter email id"
              className="border  h-[35px] p-2 rounded-md border-black"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="flex flex-col gap-1 m-2 p-2">
            Password
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="border  h-[35px] p-2 rounded-md border-black"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>

          <div className=" m-2 p-2">
            <button
              type="submit"
              className=" border border-black w-full rounded-md p-1 font-semibold bg-yellow-50"
              disabled={isLoading}
            >
              Login
            </button>
            {error && <div className="error text-pink-400 p-1">* {error} *</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { SignupInput } from "@shridhar1284/medium-zod";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.error("Signup failed", e);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md px-6">
        <div className="w-full max-w-md px-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-black ">
              {type === "signin"
                ? "Login to your account"
                : "Create an account?"}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-1 underline hover:text-black font-medium"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Enter your username"
              onChange={(e) =>
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }))
              }
            />
          ) : null}
          <LabelledInput
            label="Email"
            placeholder="you@example.com"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }))
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="********"
            onChange={(e) =>
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }))
            }
          />
        </div>

        {/* Button */}
        <button
          onClick={sendRequest}
          className="mt-6 w-96 border border-black bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-white hover:text-black transition-all"
        >
          {type === "signup" ? "Sign up" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-bold ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 w-96 px-3 py-2.5 rounded-lg text-sm focus:outline-none  focus:ring-blue-500 p-2.5 focus:border-blue-500 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

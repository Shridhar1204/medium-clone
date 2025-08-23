import { Link } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { SignupInput } from "@shridhar1284/medium-zod";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function sendRequest() {
    setError("");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );

      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);

      // FIX: Always use backend user object to avoid "Anonymous"
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(
        `${type === "signup" ? "Signed up" : "Signed in"} successfully ✅`
      );
      navigate("/blogs");
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "You Have Entered Incorrect Credentials";
      setError(msg);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md px-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {type === "signin" ? "Welcome back" : "Join Medium"}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {type === "signin"
              ? "Sign in to continue reading and writing."
              : "Create an account to share your ideas with the world."}
          </p>
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

        {error && (
          <div className="mt-4 text-center text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs((c) => ({ ...c, name: e.target.value }))
              }
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="you@example.com"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, email: e.target.value }))
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="********"
            onChange={(e) =>
              setPostInputs((c) => ({ ...c, password: e.target.value }))
            }
          />
        </div>

        <button
          onClick={sendRequest}
          className="mt-6 w-full border border-black bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-white hover:text-black transition-colors"
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
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
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

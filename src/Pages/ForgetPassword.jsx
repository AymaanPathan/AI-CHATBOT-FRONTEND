import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import eyeHide from "../../src/eye-hide.png";
import eyeView from "../../src/eye-view.png";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();

  const sendTokenToEmail = async (e) => {
    e.preventDefault();
    try {
      const response = fetch(
        "https://ai-chatbot-backend-chi.vercel.app/forgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      toast.promise(
        response.then((res) => res.json()),
        {
          loading: "Sending Code",
          success: "Check Your Mail",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changePasswordType = () => {
    setIsPassword(!isPassword);
  };

  const checkToken = async () => {
    try {
      toast.loading("Checking Token...");
      const response = await fetch(
        `https://ai-chatbot-backend-chi.vercel.app/resetPassword/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      const result = await response.json();
      toast.dismiss();
      toast.success("Password has been reset successfully!");
      navigate("/login");
      console.log(result);
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className=" mt-10  flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-96 h-screen p-3 m-auto bg-#191919 rounded-lg shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-green-700">
          ForgetPassword
        </h1>
        <form className="mt-6 h-screen">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-white">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              type="email"
              className="block w-full px-4 py-2 mt-2  text-white bg-[#212121] border rounded-t-md focus:border-green-400  focus:outline-none focus:ring-opacity-40"
            />
            <button
              type={"button"}
              onClick={sendTokenToEmail}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-b-md hover:bg-green-400 focus:outline-none focus:bg-green-600"
            >
              Send Token
            </button>
          </div>
          <div className="">
            <label className="block text-sm font-semibold text-white">
              Code
            </label>
            <input
              onChange={(e) => setToken(e.target.value)}
              value={token}
              placeholder="Token"
              type="text"
              className="block w-full px-4 py-2 mt-2  text-white bg-[#212121] border  focus:border-green-400  focus:outline-none focus:ring-opacity-40"
            />
            <div className="mt-4">
              <label className="block text-sm font-semibold text-white">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type={isPassword ? `password` : "text"}
                className="block w-full px-4 py-2 mt-2  text-white bg-[#212121] border  focus:border-green-400  focus:outline-none focus:ring-opacity-40"
              />
              <img
                onClick={changePasswordType}
                src={isPassword ? eyeHide : eyeView}
                className="relative bottom-7 cursor-pointer left-[92%] w-4 h-4"
                alt=""
              />
              <label className="block text-sm font-semibold text-white mt-4">
                ConfirmPassword
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm Password"
                type="password"
                className="block w-full px-4 py-2 mt-2  text-white bg-[#212121] border rounded-t-md focus:border-green-400  focus:outline-none focus:ring-opacity-40"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={checkToken}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-500 rounded-b-md hover:bg-green-400 "
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

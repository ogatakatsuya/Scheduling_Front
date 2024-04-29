import { useState } from "react";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegisterPage, setRegisterPage] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleUserNameChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handleRegisterChange = () => {
    setRegistered(false);
    setRegisterPage(!isRegisterPage);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsError(false);
    setRegistered(false);
    setMessage("");

    if (isRegisterPage) {
      const res = await fetch(
        "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userName, password: password }),
        }
      );

      const data = await res.json();
      setRegistered(true);
      setMessage("Registered successfully!");
      setRegisterPage(false);
    } else {
      const res = await fetch(
        "https://scheduling-endpoint-8e42d36f5cf9.herokuapp.com/auth/login",
        {
          //login and get cookie
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userName, password: password }),
        }
      );

      if (handleErrors(res)) {
        const data = await res.json();
        const access_token = data.access_token; // Access the access_token property
        onLogin(access_token); // Pass the access_token to the parent component
        if (isChecked) {
          localStorage.setItem("accessToken", access_token);
        }
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    onSubmit(event);
  };

  const handleErrors = (res: Response) => {
    if (res.ok) {
      setIsError(false);
      console.log("Logined successfully");
      return true;
    }

    setRegistered(false);

    switch (res.status) {
      case 400:
        setMessage("400:無効なトークンです。");
        console.log("INVALID_TOKEN");
        setIsError(true);
      case 401:
        setMessage("401:認証に失敗しました。");
        console.log("UNAUTHORIZED");
        setIsError(true);
      case 500:
        setMessage("500:サーバーエラーが発生しました。");
        console.log("INTERNAL_SERVER_ERROR");
        setIsError(true);
      case 502:
        setMessage("502:ゲートウェイエラーが発生しました。");
        console.log("BAD_GATEWAY");
        setIsError(true);
      case 404:
        setMessage("404:ページが見つかりませんでした。");
        console.log("NOT_FOUND");
        setIsError(true);
      default:
        setMessage("Your Name or Password is incorrect.");
        console.log("UNHANDLED_ERROR");
        setIsError(true);
    }
    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        px: 6,
        py: 8,
        mx: "auto",
        my: "auto",
        margin: 0,
      }}
    >
      <Link href="/">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Manage Your Time
        </div>
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        {!isRegisterPage && (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome back
            </h1>

            <form>
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  onChange={handleUserNameChange}
                  type="userName"
                  name="userName"
                  id="userName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Will Smith"
                  required
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <Box alignItems="center" justifyContent="center">
                {isError && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {message}
                  </Alert>
                )}
                {isRegistered && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    {message}
                  </Alert>
                )}
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                sx={{ mt: 2, ml: 0.5 }}
              >
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </Box>
              <button
                onClick={onSubmit}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-6">
                Don't have an account yet?{" "}
                <button
                  onClick={handleRegisterChange}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        )}
        {isRegisterPage && (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="userName"
                  name="userName"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ryan Gosling"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div> */}
              {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={handleRegisterChange}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </Box>
  );
};

export default Login;

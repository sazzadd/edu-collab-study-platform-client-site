import React from "react";

const Login = () => {
  return (
    <section className="h-screen">
      <div className="container h-full px-6 py-24">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Left column container with background */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone illustration"
            />
          </div>

          {/* Right column container with form */}
          <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
            <form>
              {/* Email input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  className="peer block w-full rounded border-0 bg-transparent px-3 py-2 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 [&:not(:placeholder-shown)]:placeholder-opacity-0"
                  id="emailInput"
                  placeholder="Email address"
                />
                <label
                  htmlFor="emailInput"
                  className="absolute left-3 top-0 text-neutral-500 transition-all duration-200 ease-out peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-primary dark:text-neutral-400"
                >
                  Email address
                </label>
              </div>

              {/* Password input */}
              <div className="relative mb-6">
                <input
                  type="password"
                  className="peer block w-full rounded border-0 bg-transparent px-3 py-2 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 peer-focus:text-primary dark:text-white dark:placeholder:text-neutral-300 [&:not(:placeholder-shown)]:placeholder-opacity-0"
                  id="passwordInput"
                  placeholder="Password"
                />
                <label
                  htmlFor="passwordInput"
                  className="absolute left-3 top-0 text-neutral-500 transition-all duration-200 ease-out peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-primary dark:text-neutral-400"
                >
                  Password
                </label>
              </div>

              {/* Remember me checkbox */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary focus:ring-primary"
                    id="rememberMe"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 text-neutral-500 dark:text-neutral-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-primary dark:text-primary-400 focus:outline-none"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full rounded bg-primary px-7 py-3 text-sm font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Sign in
              </button>

              {/* Divider */}
              <div className="my-4 flex items-center">
                <div className="flex-1 border-t border-neutral-300"></div>
                <p className="mx-4 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
                <div className="flex-1 border-t border-neutral-300"></div>
              </div>

              {/* Social login buttons */}
              <a
                href="#!"
                className="mb-3 flex items-center justify-center w-full rounded bg-blue-600 px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
                Continue with Facebook
              </a>
              <a
                href="#!"
                className="mb-3 flex items-center justify-center w-full rounded bg-blue-400 px-7 py-3 text-center text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                >
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm66.1 383.1c-39.6 0-79.1-15-109.1-45s-45-69.5-45-109.1 15-79.1 45-109.1 69.5-45 109.1-45 79.1 15 109.1 45 45 69.5 45 109.1-15 79.1-45 109.1-69.5 45-109.1 45z" />
                </svg>
                Continue with Twitter
              </a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

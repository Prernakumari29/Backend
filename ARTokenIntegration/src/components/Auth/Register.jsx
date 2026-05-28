import React from "react";

const Register = ({ setToggle }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Register
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
          />

          <input
            type="password"
            placeholder="Create password"
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-500"
          />

          <button
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Register
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <p className="text-gray-500 text-sm">
            OR
          </p>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

        </div>

       


        {/* Switch */}
        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <button
            onClick={() => setToggle(true)}
            className="text-green-600 font-semibold mt-2 hover:underline"
          >
            Switch to Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;
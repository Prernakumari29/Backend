import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [loading, setLoading] = useState(false);

  const [showOtpBox, setShowOtpBox] = useState(false);

  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  // SEND OTP
  const sentOtp = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/register",
        { email }
      );

      alert(res.data);

      setShowOtpBox(true);

      setTimer(60);

    } catch (error) {

      console.log("error in sentotp api", error);

    } finally {

      setLoading(false);

    }
  };

  // TIMER
  useEffect(() => {

    let interval;

    if (showOtpBox && timer > 0) {

      interval = setInterval(() => {

        setTimer((prev) => prev - 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [showOtpBox, timer]);

  // HANDLE OTP INPUT
  const handleChange = (value, index) => {

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // AUTO FOCUS NEXT INPUT
    if (value && index < 3) {

      document.getElementById(`otp-${index + 1}`).focus();

    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {

    try {

      const finalOtp = otp.join("");

      const res = await axios.post(
        "http://localhost:3000/verify",
        {
          email,
          otp: finalOtp
        }
      );

      alert(res.data);
      navigate("/home");

    } catch (error) {

      console.log("error in verify api", error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          OTP Verification
        </h1>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* SEND OTP BUTTON */}
        <button
          onClick={sentOtp}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >

          {loading ? "Sending OTP..." : "Send OTP"}

        </button>

        {/* OTP BOX */}
        {showOtpBox && (

          <>

            <div className="flex justify-between mt-6">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  className="w-16 h-16 border border-gray-300 rounded-lg text-center text-2xl outline-none focus:ring-2 focus:ring-green-500"
                />

              ))}

            </div>

            {/* TIMER */}
            <p className="text-center mt-4 text-gray-600">

              OTP valid for :

              {" "}

              {Math.floor(timer / 60)}:

              {(timer % 60).toString().padStart(2, "0")}

            </p>

            {/* VERIFY BUTTON */}
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition font-semibold"
            >
              Verify OTP
            </button>

          </>

        )}

      </div>

    </div>
  );
};

export default Auth


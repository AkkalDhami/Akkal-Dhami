// components/OtpLogin.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Loader2Icon } from "lucide-react";

import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "../../features/auth/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OtpInput from "./input-otp";
import { setCredentials } from "../../features/auth/authSlice";

export default function OtpLogin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [requestOtp, { isLoading: sendingOtp }] = useRequestOtpMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();

  const handleRequestOtp = async () => {
    try {
      const res = await requestOtp().unwrap();
      toast.success(res.message);
      setStep(2);
    } catch (err) {
      toast.error(err.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (code) => {
    try {
      const res = await verifyOtp(code).unwrap();
      console.log(res)
      dispatch(setCredentials({ accessToken: res.accessToken }));
      toast.success("Login successful!");
      setStep(3);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 items-center justify-center flex">
      <div className="max-w-[500px] bg-background w-full mt-20 p-6 border rounded-lg shadow-lg">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <Button
              className="w-full font-semibold"
              onClick={handleRequestOtp}
              size={"lg"}
              disabled={sendingOtp}
            >
              {sendingOtp ? (
                <>
                  <Loader2Icon className="animate-spin" /> Sending OTP..{" "}
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <OtpInput onsubmit={handleVerifyOtp} isLoading={verifying} handleRequestOtp={handleRequestOtp} sendingOtp={sendingOtp}/>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Login successful!</h2>
            <Button variant="link" onClick={() => setStep(1)}>
              Go back
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

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
import { setCredentials } from "../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OtpLogin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");

  const [requestOtp, { isLoading: sendingOtp }] = useRequestOtpMutation();
  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();

  const handleRequestOtp = async () => {
    try {
      const res = await requestOtp().unwrap();
      toast.success(res.message);
      setStep(2);
      setCode("");
    } catch (err) {
      toast.error(err.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(code).unwrap();
      dispatch(setCredentials({ accessToken: res.accessToken }));
      toast.success("Login successful!");
      setStep(3);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <section className="min-h-screen m-2 bg-background flex items-center justify-center">
      <div className="max-w-[380px] w-full mt-20 p-6 border rounded-lg shadow-lg">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <Button
              className="w-full"
              onClick={handleRequestOtp}
              disabled={sendingOtp}>
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
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <Label htmlFor="otp" className="mb-2">
              OTP CODE
            </Label>
            <Input
              id="otp"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mb-4 px-3.5 py-4 font-medium"
            />
            <Button
              onClick={handleVerifyOtp}
              className="w-full"
              disabled={verifying}>
              {verifying ? (
                <>
                  <Loader2Icon className="animate-spin" /> Verifying..{" "}
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleRequestOtp}
              className="mt-2">
              {sendingOtp ? (
                <>
                  <Loader2Icon className="animate-spin" /> Sending OTP..{" "}
                </>
              ) : (
                "Resend OTP"
              )}
            </Button>
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

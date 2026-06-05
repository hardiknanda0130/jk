"use client";

import { TokenStorage } from "@/components/tokenStorage";
import ApiEndPoints from "@/lib/ApiServiceEndpoint";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const handleSSOLogin = () => {
    // window.location.href = "http://10.147.8.83:812/sso/sso/admin-dashboard/";
    window.location.href = "http://localhost:3000/dashboard";
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const initSSOLogin = async () => {
      try {
        const authCode = searchParams.get("authCode");

        // ❌ No authCode
        if (!authCode) {
          setIsUnauthorized(true);
          return;
        }

        sessionStorage.setItem("authCode", authCode);

        const ssoToken = TokenStorage.getSsoAccessToken();

        if (!ssoToken) {
          setIsUnauthorized(true);
          return;
        }
        const response = await fetch(ApiEndPoints.ssoUserProfile, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ssoToken}`,
          },
          body: JSON.stringify({ id: authCode }),
        });

        if (!response.ok) {
          setIsUnauthorized(true);
          return;
        }

        const profile = await response.json();

        if (!profile?.projects?.length) {
          setIsUnauthorized(true);
          return;
        }

        // await login(null, true, profile);

        router.replace("/dashboard"); // only success redirect
      } catch (error) {
        console.error("SSO Auto Login Error:", error);
        setIsUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    // initSSOLogin();
  }, []);
  // if (loading && !isUnauthorized) {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center bg-white">
  //       <div className="flex flex-col items-center gap-4">
  //         <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
  //         <p className="text-lg font-medium text-slate-700">
  //           Signing you in securely...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex bg-linear-to-br from-blue-900 to-indigo-700">
      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex w-1/2 text-white p-12 flex-col justify-center">
        <div className="flex items-center gap-4 mb-6">
          <Image src="/icon.png" alt="Icon" width={70} height={70} />
          <h1 className="text-4xl font-bold leading-snug">
            Face Recognition Based <br />
            Biometric Attendance System
          </h1>
        </div>

        <p className="text-lg text-blue-100 mb-10">
          Secure • Intelligent • Real-time identity verification
        </p>

        {/* Action Cards */}
        <div className="space-y-4">
          <ActionRow
            title="Organization Master"
            desc="Create a new user account to access the system securely."
          />

          <ActionRow
            title="Organization Registration"
            desc="Register your organization to manage users and permissions."
          />

          <ActionRow
            title="Face Authentication"
            desc="Login securely using AI powered face recognition."
          />
        </div>

        <p className="mt-16 text-sm text-blue-200">
          Designed & Developed by <strong>NIC Punjab</strong>
        </p>
      </div>

      {/* ================= RIGHT LOGIN CARD ================= */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
          <Image
            src="/Nic_logo2-01.png"
            alt="NIC Logo"
            width={140}
            height={50}
            className="mx-auto mb-6"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>

          <p className="text-gray-500 mb-8">
            Please login using Single Sign-On
          </p>

          {/* SSO BUTTON */}
          <button
            onClick={handleSSOLogin}
            className="
              w-full
              bg-linear-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              font-semibold
              py-3
              rounded-xl
              shadow-lg
              transition
              duration-200
            "
          >
            🔐 Login via SSO
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= Reusable Row Component ================= */
function ActionRow({ title, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-blue-100">{desc}</p>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
        Click
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TokenStorage } from "./tokenStorage";
import { startAutoRefresh } from "./ssoAutoRefresh";

export default function SsoProtectedProvider({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const ssoToken = TokenStorage.getSsoAccessToken();
    const ssoTokenRefresh = TokenStorage.getSsoRefreshToken();

    if (!ssoToken || !ssoTokenRefresh) {
      router.replace("/login");
      return;
    }
    startAutoRefresh();
    // ✅ token exists
    setChecked(true);
  }, [router]);

  // ⏳ prevent flicker
  //   if (!checked) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center text-slate-500 text-sm">
  //         Checking SSO session…
  //       </div>
  //     );
  //   }

  return <>{children}</>;
}

"use client";

import "@/styles/header.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // 🔹 future me yahan token / session clear hoga
    localStorage.clear();
    sessionStorage.clear();

    // 🔹 login page pe redirect
    router.push("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="header-title ms-8">Face Recognition System</span>
        <span className="header-subtitle ms-8">Admin Dashboard</span>
      </div>

      <div className="header-right">
      <div className="header-user">
  <div className="header-avatar">
    <span>A</span>
  </div>

  <div className="header-user-info">
    <span className="header-username">Admin</span>
    <span className="header-role">Administrator</span>
  </div>
</div>


        <button className="header-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

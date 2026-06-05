"use client";

import SsoProtectedProvider from "./SsoProtectedProvider";

// import { AuthProvider } from "@bbmb/auth";

export default function ClientProviders({ children }) {
  return (
    // <AuthProvider
    //   clientId="SSO_LOGIN"
    //   domain="http://localhost:4000" // future
    //   redirectUri="/callback"
    // >
    // <SsoProtectedProvider>{
      
      children
      // </SsoProtectedProvider>
    // </AuthProvider>
  );
}

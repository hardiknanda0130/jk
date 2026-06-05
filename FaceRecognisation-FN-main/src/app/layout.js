import ClientProviders from "@/components/providers";
import "./globals.css";

export const metadata = {
  title: "Face Recognition App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

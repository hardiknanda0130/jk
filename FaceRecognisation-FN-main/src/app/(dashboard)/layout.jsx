import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed via CSS) */}
      <Sidebar />

      {/* Right side content */}
      <div
        className="flex-1 flex flex-col"
        style={{
           // sidebar width
        }}
      >
        {/* Header */}
        <Header />

        {/* Scrollable content area */}
        <main
          className="flex-1 p-4"
          style={{
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

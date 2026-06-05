"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  ScanFace,
  Megaphone,
  HelpCircle,
  LifeBuoy,
  LogOut,
  ChevronDown,
  ChevronRight,
  FileEdit,
  Camera,
  ClipboardCheck,
  ListChecks,
  Cpu,
  FileBarChart2,
  UserCheck,
  CalendarCheck,
  Monitor,
  Settings,
  BarChart3,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

/** ✅ Tooltip */
const Tooltip = ({
  text,
  enabled = true,
  placement = "top", // "top" | "bottom"
  children,
}) => {
  const position =
    placement === "bottom"
      ? "left-1/2 -translate-x-1/2 top-full mt-2"
      : "left-1/2 -translate-x-1/2 -top-2 -translate-y-full";

  return (
    <div className="relative group inline-flex">
      <div className="inline-flex">{children}</div>

      {enabled && (
        <div
          className={`absolute ${position}
          whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded
          opacity-0 group-hover:opacity-100 transition pointer-events-none z-9999`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ children }) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false); // ✅ mobile open/close
  const [isMinimized, setIsMinimized] = useState(false); // ✅ desktop minimize

  const [openFaceAuth, setOpenFaceAuth] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);

  const isActive = (path) => pathname === path;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // ✅ desktop pe aate hi mobile sidebar close
      if (!mobile) setIsOpen(false);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ✅ when mobile sidebar open, prevent background scroll
  useEffect(() => {
    if (isMobile && isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  // ✅ mobile pe item click -> close sidebar
  const closeOnMobile = () => {
    if (isMobile) setIsOpen(false);
  };

  /** ✅ Nav Item */
  const Item = ({ href, icon: Icon, label, alwaysTooltip = false }) => (
    <Tooltip text={label} enabled={alwaysTooltip || isMinimized}>
      <Link
        href={href}
        onClick={closeOnMobile}
        className={`flex items-center gap-3 ${
          isMinimized ? "px-4 justify-center" : "px-5"
        } py-2 rounded-md text-sm transition-all duration-200
        ${
          isActive(href)
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-blue-500/20 hover:text-white"
        }`}
      >
        <Icon size={18} />
        {!isMinimized && <span>{label}</span>}
      </Link>
    </Tooltip>
  );

  const SectionHeader = ({ icon: Icon, label, open, toggle }) => (
    <Tooltip text={label} enabled={isMinimized}>
      <div
        onClick={toggle}
        className={`flex items-center ${
          isMinimized ? "justify-center px-4" : "justify-between px-5"
        } py-2 text-gray-300 hover:bg-blue-500/20 rounded-md cursor-pointer transition`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          {!isMinimized && <span>{label}</span>}
        </div>

        {!isMinimized &&
          (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
      </div>
    </Tooltip>
  );

  // ✅ Sidebar width (desktop)
  const desktopSidebarWidth = isMinimized ? 80 : 288;

  return (

    
    <div className="min-h-screen">
      {/* ✅ MENU BUTTON (mobile only) */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-60">
          <Tooltip text="Open Sidebar" enabled={true} placement="bottom">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md bg-white/80 hover:bg-white transition shadow"
            >
              <Menu size={24} className="text-slate-900" />
            </button>
          </Tooltip>
        </div>
      )}

      {/* ✅ OVERLAY (mobile only) */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ✅ SIDEBAR */}
      <aside
      
        className={`fixed top-0 left-0 h-full ${
          isMinimized ? "w-20" : "w-72"
        }
        bg-linear-to-b from-slate-900 to-slate-800
        shadow-2xl transition-all duration-300 ease-in-out z-50
        ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
      >
        {/* ✅ Header inside sidebar (ONLY minimize/expand button) */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {!isMinimized && (
              <img src="/FaceRecognisation3.png" alt="Logo" className="h-10" />
            )}
          </div>

          <Tooltip
            text={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
            enabled={true}
            placement="bottom"
          >
            {isMinimized ? (
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <PanelLeftOpen
                  size={20}
                  className="text-gray-400 hover:text-white"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-md hover:bg-white/10 transition"
              >
                <PanelLeftClose
                  size={20}
                  className="text-gray-400 hover:text-white"
                />
              </button>
            )}
          </Tooltip>
        </div>

        {/* ✅ NAV */}
        <nav className="flex flex-col gap-4 mt-4 px-3 overflow-y-auto custom-scrollbar h-[calc(100vh-64px)] pb-6">
          <Item href="/dashboard" icon={LayoutDashboard} label="Dashboard" alwaysTooltip />
          <Item href="/organization" icon={Building2} label="Organization" />
          <Item href="/users" icon={Users} label="User Registration" />

          <SectionHeader
            icon={ScanFace}
            label="Face Authentication"
            open={openFaceAuth}
            toggle={() => setOpenFaceAuth(!openFaceAuth)}
          />
          {openFaceAuth && !isMinimized && (
            <div className="ml-6 flex flex-col gap-1 
bg-white/5 backdrop-blur-sm 
rounded-lg p-2 border border-white/10">
              <Item href="/face-auth/enroll" icon={Camera} label="Enroll Face" />
              <Item href="/face-auth/attendance" icon={ClipboardCheck} label="Mark Attendance" />
              <Item href="/face-auth/logs" icon={ListChecks} label="Face Auth Logs" />
              <Item href="/face-auth/devices" icon={Cpu} label="Device Registration" />
            </div>
          )}

          <SectionHeader
            icon={Settings}
            label="Masters"
            open={openMaster}
            toggle={() => setOpenMaster(!openMaster)}
          />
          {openMaster && !isMinimized && (
            <div className="ml-6 flex flex-col gap-1 
bg-white/5 backdrop-blur-sm 
rounded-lg p-2 border border-white/10">
              <Item href="/masters/organization_type" icon={Cpu} label="Organization Master" />
              <Item href="/masters/parent-organization" icon={Cpu} label="Parent Organization" />
              <Item href="/masters/state" icon={Cpu} label="State Master" />
              <Item
                href="/masters/district"
                icon={Cpu}
                label="District Master"
              />
              <Item
                href="/masters/gender"
                icon={Building2}
                label="Gender Master"
              />
              <Item
                href="/masters/organizationname"
                icon={Building2}
                label="Organization Name Master"
              />
              <Item
                href="/masters/usertype"
                icon={Building2}
                label="User Type Master"
              />
              <Item
                href="/masters/division-unit"
                icon={Cpu}
                label="Division Master"
              />
              <Item
                href="/masters/designation"
                icon={Building2}
                label="Designation Master"
              />
              <Item
                href="/masters/officelocation"
                icon={Building2}
                label="Office Location Master"
              />
              <Item
                href="/masters/org-onboarding"
                icon={Building2}
                label="Organization Onboarding"
              />
            </div>
          )}



          <SectionHeader
            icon={FileBarChart2}
            label="Attendance Reports"
            open={openAttendance}
            toggle={() => setOpenAttendance(!openAttendance)}
          />
          {openAttendance && !isMinimized && (
            <div className="ml-6 flex flex-col gap-1 
bg-white/5 backdrop-blur-sm 
rounded-lg p-2 border border-white/10">
              <Item href="/attendance/registered-users" icon={UserCheck} label="Registered Users" />
              <Item href="/attendance/AttendanceReport" icon={ListChecks} label="Attendance Summary" />
              <Item href="/attendance/present-today" icon={CalendarCheck} label="Present Today" />
              <Item href="/attendance/device" icon={Monitor} label="Device" />
              <Item
                href="/attendance/mpr"
                icon={BarChart3}
                label="MPR (Monthly Report)"
              />
            </div>
          )}

          {/* ANNOUNCEMENT */}
          <SectionHeader
            icon={Megaphone}
            label="Announcement"
            open={openAnnouncement}
            toggle={() => setOpenAnnouncement(!openAnnouncement)}
          />
          {openAnnouncement && !isMinimized && (
            <div className="ml-6 flex flex-col gap-1 
bg-white/5 backdrop-blur-sm 
rounded-lg p-2 border border-white/10">
              <Item href="/announcements/new-features" icon={Megaphone} label="New Features (Software)" />
              <Item href="/announcements/service-fluctuation" icon={Megaphone} label="Fluctuation in Services" />
            </div>
          )}

          <SectionHeader
            icon={HelpCircle}
            label="FAQ"
            open={openFaq}
            toggle={() => setOpenFaq(!openFaq)}
          />
          {openFaq && !isMinimized && (
            <div className="ml-6 flex flex-col gap-1 
bg-white/5 backdrop-blur-sm 
rounded-lg p-2 border border-white/10">
              <Item href="/faq/error-codes" icon={HelpCircle} label="Error Codes" />
              <Item href="/faq/employee-user-manual" icon={HelpCircle} label="Employee User Manual" />
              <Item href="/faq/dashboard-device-installation" icon={HelpCircle} label="Dashboard Device Installation" />
              <Item href="/faq/transfer-manual" icon={HelpCircle} label="Transfer Manual" />
              <Item href="/faq/dopt-order-2015" icon={HelpCircle} label="DoPT Order Dated 22.06.2015" />
              <Item href="/faq/note-2015" icon={HelpCircle} label="Note dated 02.06.2015" />
              <Item href="/faq/om-2014" icon={HelpCircle} label="OM dated 21.11.2014" />
            </div>
          )}

          <Item href="/support" icon={LifeBuoy} label="Support" />
          <div className="border-t border-slate-700 my-3"></div>
          <Item href="/login" icon={LogOut} label="Log Out" />
        </nav>
      </aside>

      {/* ✅ MAIN CONTENT WRAPPER */}
      <main
        className="min-h-screen transition-[margin] duration-300"
        style={{
          marginLeft: isMobile ? 0 : `${desktopSidebarWidth}px`,
        }}
      >
        <div className="pt-2">{children}</div>
      </main>
    </div>
  );
}

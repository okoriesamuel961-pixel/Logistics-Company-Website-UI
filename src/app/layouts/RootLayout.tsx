import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
